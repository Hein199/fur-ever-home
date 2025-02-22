import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Replace jsonwebtoken with jose

const PUBLIC_ROUTES = ['/login', '/sign-up'];
const PROTECTED_ROUTES = ['/app', '/shelter', '/admin'];

const isProtectedPath = (pathname: string) => {
    return PROTECTED_ROUTES.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );
};

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    console.log(`\nMiddleware triggered for: ${pathname}`);
    console.log('Token exists:', !!token);

    // Allow static files and API routes
    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/') ||
        pathname.startsWith('/images/')
    ) {
        return NextResponse.next();
    }

    try {
        if (token) {
            // Create secret key
            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

            // Verify token with jose instead of jsonwebtoken
            const { payload: decoded } = await jwtVerify(token, secret, {
                algorithms: ['HS256']
            });

            console.log('Authenticated user:', {
                role: decoded.role,
                id: decoded.id,
                email: decoded.email
            });

            // Redirect authenticated users away from auth pages
            if (PUBLIC_ROUTES.includes(pathname)) {
                const redirectPath = decoded.role === 'user' ? '/'
                    : decoded.role === 'shelter' ? '/shelter'
                        : '/admin';

                return NextResponse.redirect(new URL(redirectPath, request.url));
            }

            // Role-based access control
            if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
                return NextResponse.redirect(new URL('/', request.url));
            }

            if (pathname.startsWith('/shelter') && decoded.role !== 'shelter') {
                return NextResponse.redirect(new URL('/', request.url));
            }

            return NextResponse.next();
        }

        // Redirect unauthenticated users from protected routes
        if (!token && isProtectedPath(pathname)) {
            console.log('Redirecting unauthenticated user from protected path');
            return NextResponse.redirect(new URL('/login', request.url));
        }

        return NextResponse.next();

    } catch (error) {
        console.error('Authentication error:', error);

        // Clear invalid token
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');

        return response;
    }
}