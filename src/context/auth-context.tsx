"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

type User = {
    id: number;
    role: 'user' | 'shelter' | 'admin';
    email: string;
    name: string;
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
        const verifyToken = async () => {
            console.log('Verifying token...');
            const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
            if (!token) {
                console.log('No token found');
                return;
            }

            try {
                console.log('Validating token:', token);
                const response = await fetch('/api/auth/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    console.error('Token validation failed with status:', response.status);
                    throw new Error('Token validation failed');
                }
                const userData = await response.json();
                console.log('Token validated successfully:', userData);
                setUser(userData);

                // Client-side redirect only if on login/signup page
                if (['/login', '/sign-up'].includes(window.location.pathname)) {
                    redirectBasedOnRole(userData.role);
                }
            } catch (error) {
                console.error('Token validation error:', error);
                logout();
            }
        };
        verifyToken();
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

            // Immediately redirect after successful login
            const redirectPath = userData.role === 'user' ? '/'
                : userData.role === 'shelter' ? '/shelter'
                    : '/admin';
            router.push(redirectPath);

        } catch (error: any) {
            console.error('Login error:', error);
            alert(error.message || "Login failed");
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

    const logout = () => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setUser(null);
        router.push('/login');
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