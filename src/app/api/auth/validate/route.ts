import { query } from '@/lib/database';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const sessionId = (await cookieStore).get('sessionId')?.value;
    const userRole = (await cookieStore).get('userRole')?.value;

    if (!sessionId || !userRole) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    try {
        let table, idColumn, emailColumn, nameColumn;
        switch (userRole) {
            case 'user':
                table = 'users';
                idColumn = 'user_id';
                emailColumn = 'user_email';
                nameColumn = 'user_name';
                break;
            case 'shelter':
                table = 'shelter';
                idColumn = 'shelter_id';
                emailColumn = 'shelter_email';
                nameColumn = 'shelter_name';
                break;
            case 'admin':
                table = 'admin';
                idColumn = 'admin_id';
                emailColumn = 'admin_email';
                nameColumn = 'admin_name';
                break;
            default:
                return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        // const result = await query(
        //     `SELECT ${idColumn}, ${emailColumn}, ${nameColumn} FROM ${table} WHERE ${idColumn} = $1`,
        //     [sessionId]
        // );

        const result = await query(
            `SELECT ${idColumn}, ${emailColumn}, ${nameColumn}, 
                    user_phone, location, avatar 
             FROM ${table} 
             WHERE ${idColumn} = $1`,
            [sessionId]
        );

        if (!result.rows[0]) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user = result.rows[0];

        return NextResponse.json({
            id: user[idColumn],
            role: userRole,
            email: user[emailColumn],
            name: user[nameColumn],
            phone: user.user_phone,
            location: user.location,
            avatar: user.avatar
        });
        // return NextResponse.json({
        //     id: user[idColumn],
        //     role: userRole,
        //     email: user[emailColumn],
        //     name: user[nameColumn]
        // });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}