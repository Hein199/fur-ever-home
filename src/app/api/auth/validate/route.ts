import { query } from '@/lib/database';
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const id = searchParams.get('id');

    try {
        if (!role || !id) return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });

        let table, idColumn;
        switch (role) {
            case 'user':
                table = 'users';
                idColumn = 'user_id';
                break;
            case 'shelter':
                table = 'shelter';
                idColumn = 'shelter_id';
                break;
            case 'admin':
                table = 'admin';
                idColumn = 'admin_id';
                break;
            default:
                return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        const result = await query(
            `SELECT * FROM ${table} WHERE ${idColumn} = $1`,
            [id]
        );

        if (!result.rows[0]) return NextResponse.json({ error: 'User not found' }, { status: 404 });

        const user = result.rows[0];
        return NextResponse.json({
            id: user[idColumn],
            role,
            email: user[role === 'user' ? 'user_email' : role === 'shelter' ? 'shelter_email' : 'admin_email'],
            name: user[`${role}_name`]
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
        return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const { payload } = await jwtVerify(token, secret, { algorithms: ['HS256'] });

        return NextResponse.json({
            id: payload.id,
            role: payload.role,
            email: payload.email,
            name: payload.name
        });

    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}