import { query } from '@/lib/database';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password, role } = await request.json();

    try {
        let table, emailColumn, idColumn, nameColumn;
        switch (role) {
            case 'user':
                table = 'users';
                emailColumn = 'user_email';
                idColumn = 'user_id';
                nameColumn = 'user_name';
                break;
            case 'shelter':
                table = 'shelter';
                emailColumn = 'shelter_email';
                idColumn = 'shelter_id';
                nameColumn = 'shelter_name';
                break;
            case 'admin':
                table = 'admin';
                emailColumn = 'admin_email';
                idColumn = 'admin_id';
                nameColumn = 'admin_name';
                break;
            default:
                return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        const result = await query(
            `SELECT * FROM ${table} WHERE ${emailColumn} = $1`,
            [email]
        );

        const user = result.rows[0];
        if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const validPassword = await bcrypt.compare(password, user.hashed_password);
        if (!validPassword) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const token = await new SignJWT({
            id: user[idColumn],
            role,
            email: user[emailColumn]
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(process.env.JWT_SECRET!));

        const response = NextResponse.json({
            id: user[idColumn],
            role,
            email: user[emailColumn],
            name: user[nameColumn]
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Add this
            path: '/', // Add this
            maxAge: 86400
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}