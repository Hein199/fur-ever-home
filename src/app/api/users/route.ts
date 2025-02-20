import { NextResponse } from "next/server";
import { getUsersFromDB, getUserPageCountFromDB } from "@/lib/database";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");

        const users = await getUsersFromDB(page);
        const pageCount = await getUserPageCountFromDB();

        return NextResponse.json({ users, pageCount }, { status: 200 });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}