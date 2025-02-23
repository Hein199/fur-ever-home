import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });

    // Clear all auth cookies
    response.cookies.delete('sessionId');
    response.cookies.delete('userRole');

    return response;
}