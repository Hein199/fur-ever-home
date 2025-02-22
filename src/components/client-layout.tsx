"use client";

import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/toaster";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <Toaster />
            {children}
        </AuthProvider>
    );
}