import SiteNav from "@/components/site-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import React from "react";

// TODO: Replace with actual login state
const isLogin = true;

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <header className="flex gap-4 justify-between items-center py-2 px-4 border-b shadow-md">
      {/* logo */}
      <div>
        <Link href="/" passHref>
          <div className="flex items-center gap-2">
            <PawPrint className="size-6" />
            <span className="font-bold text-lg">Fur-Ever Home</span>
          </div>
          {/* <Image
              src="/path/to/logo.svg"
              alt="Fur-Ever Home"
              width={150}
              height={50}
            /> */}
        </Link>
      </div>
      <SiteNav />
      {/* Login */}
      <div>
        {isLogin ? (
          <Button variant={"ghost"} size={"icon"} asChild>
            <Link href="/app/profile">
              <Avatar>
                <AvatarImage src="/path/to/avatar.jpg" alt="Profile Avatar" />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
            </Link>
          </Button>
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

export default Layout;
