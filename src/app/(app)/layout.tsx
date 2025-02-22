"use client";

import SiteNav from "@/components/site-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex gap-4 justify-between items-center py-2 px-4 border-b shadow-md">
        <div>
          <Link href="/" passHref>
            <div className="flex items-center gap-2">
              <PawPrint className="size-6" />
              <span className="font-bold text-lg">Fur-Ever Home</span>
            </div>
          </Link>
        </div>
        <SiteNav />
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant={"ghost"} size={"icon"} asChild>
                <Link href={user.role === 'user' ? '/app/profile' : user.role === 'shelter' ? '/shelter' : '/admin'}>
                  <Avatar>
                    <AvatarImage src="/path/to/avatar.jpg" alt="Profile Avatar" />
                    <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button variant={"ghost"} asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 Fur-Ever Home. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;