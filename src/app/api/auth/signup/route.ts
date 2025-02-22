import { query } from '@/lib/database';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const data = await request.json();

    try {
        let queryText, params;
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

        if (data.role === 'user') {
            queryText = `
        INSERT INTO users 
        (user_name, user_email, hashed_password, user_phone, location, role)
        VALUES ($1, $2, $3, $4, $5, 'user')
        RETURNING *
      `;
            params = [
                data.name,
                data.email,
                hashedPassword,
                data.phone,
                data.location
            ];
        } else if (data.role === 'shelter') {
            queryText = `
        INSERT INTO shelter 
        (shelter_name, shelter_email, hashed_password, shelter_phone, 
         opening_time, closing_time, location, capacity, role)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'shelter')
        RETURNING *
      `;
            params = [
                data.name,
                data.email,
                hashedPassword,
                data.phone,
                data.opening_time,
                data.closing_time,
                data.location,
                data.capacity
            ];
        } else {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        const result = await query(queryText, params);
        const newUser = result.rows[0];
        const userId = data.role === 'user' ? newUser.user_id : newUser.shelter_id;

        const token = await new SignJWT({
            id: userId,
            role: data.role,
            email: newUser.email
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(secret);

        const response = NextResponse.json({
            id: newUser.id,
            role: data.role,
            email: newUser.email,
            name: newUser.name
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Add this
            path: '/', // Add this
            maxAge: 86400
        });

        return response;
    } catch (error: any) {
        if (error.code === '23505') {
            return NextResponse.json(
                { error: 'Email already exists' },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}