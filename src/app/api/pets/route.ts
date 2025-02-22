import { query } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 10;
  const offset = (page - 1) * limit;

  try {
    // Fetch pets from the database
    const pets = await query(`
      SELECT pet_id, pet_name, age, gender, location, avatar FROM pet
      ORDER BY pet_id
      LIMIT $1 OFFSET $2`, [limit, offset]);

    console.log("API Response:", pets.rows); // Debug log

    return NextResponse.json({ pets: pets.rows, totalPages: 10 }); // Adjust total pages if needed
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch pets" }, { status: 500 });
  }
}