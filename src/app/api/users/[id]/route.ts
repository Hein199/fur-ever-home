import { query } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = Number(params.id);
        const result = await query(
            "SELECT user_id, user_name, user_email, user_phone, avatar, location FROM users WHERE user_id = $1",
            [userId]
        );

        if (!result.rows[0]) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const user = result.rows[0];
        return NextResponse.json({
            id: user.user_id,
            name: user.user_name,
            email: user.user_email,
            phone: user.user_phone,
            location: user.location,
            avatar: user.avatar
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}