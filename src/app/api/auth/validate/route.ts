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
        let sqlQuery;
        let params = [sessionId];

        switch (userRole) {
            case 'user':
                sqlQuery = `
                    SELECT 
                        user_id as id,
                        user_email as email,
                        user_name as name,
                        user_phone as phone,
                        location,
                        avatar
                    FROM users 
                    WHERE user_id = $1
                `;
                break;
            case 'shelter':
                sqlQuery = `
                    SELECT 
                        shelter_id as id,
                        shelter_email as email,
                        shelter_name as name,
                        shelter_phone as phone,
                        location,
                        avatar
                    FROM shelter 
                    WHERE shelter_id = $1
                `;
                break;
            case 'admin':
                sqlQuery = `
                    SELECT 
                        admin_id as id,
                        admin_email as email,
                        admin_name as name,
                        admin_phone as phone,
                        NULL as location,
                        NULL as avatar
                    FROM admin 
                    WHERE admin_id = $1
                `;
                break;
            default:
                return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        const result = await query(sqlQuery, params);

        if (!result.rows[0]) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const user = result.rows[0];

        return NextResponse.json({
            id: user.id,
            role: userRole,
            email: user.email,
            name: user.name,
            phone: user.phone || null,
            location: user.location || null,
            avatar: user.avatar || null
        });

    } catch (error) {
        console.error('Validation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}