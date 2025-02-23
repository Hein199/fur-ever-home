"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// type User = {
//     id: number;
//     role: 'user' | 'shelter' | 'admin';
//     email: string;
//     name: string;
// } | null;
type User = {
    id: number;
    role: 'user' | 'shelter' | 'admin';
    email: string;
    name: string;
    phone?: string;
    location?: string;
    avatar?: string;
} | null;


type AuthContextType = {
    user: User;
    login: (email: string, password: string, role: string) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/api/auth/validate');
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Session validation error:', error);
                logout();
            }
        };
        checkSession();
    }, []);

    const login = async (email: string, password: string, role: string) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const userData = await res.json();
            setUser(userData);

            const redirectPath = userData.role === 'user' ? '/'
                : userData.role === 'shelter' ? '/shelter'
                    : '/admin';
            router.push(redirectPath);
        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const signup = async (data: any) => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error(await res.text());

        const userData = await res.json();
        setUser(userData);
        redirectBasedOnRole(userData.role);
    };

    const redirectBasedOnRole = (role: string) => {
        switch (role) {
            case 'user': router.push('/'); break;
            case 'shelter': router.push('/shelter'); break;
            case 'admin': router.push('/admin'); break;
            default: router.push('/');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};