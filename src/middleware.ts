import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/sign-up'];
const PROTECTED_ROUTES = ['/app', '/shelter', '/admin'];

const isProtectedPath = (pathname: string) => {
    return PROTECTED_ROUTES.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionId = request.cookies.get('sessionId')?.value;
    const userRole = request.cookies.get('userRole')?.value;

    // Allow static files and API routes
    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/') ||
        pathname.startsWith('/images/')
    ) {
        return NextResponse.next();
    }

    if (sessionId && userRole) {
        // Redirect authenticated users away from auth pages
        if (PUBLIC_ROUTES.includes(pathname)) {
            const redirectPath = userRole === 'user' ? '/'
                : userRole === 'shelter' ? '/shelter'
                    : '/admin';
            return NextResponse.redirect(new URL(redirectPath, request.url));
        }

        // Role-based access control
        if (pathname.startsWith('/admin') && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (pathname.startsWith('/shelter') && userRole !== 'shelter') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    }

    // Redirect unauthenticated users from protected routes
    if (!sessionId && isProtectedPath(pathname)) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}