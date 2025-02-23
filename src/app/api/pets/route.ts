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
      SELECT pet_id, pet_name, age, gender, location, avatar, weight, color, size, status FROM pet
      ORDER BY pet_id
      LIMIT $1 OFFSET $2`, [limit, offset]);
      
    const totalCountResult = await query("SELECT COUNT(*) FROM pet");
    const totalPets = parseInt(totalCountResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalPets / limit);

    console.log("API Response:", pets.rows); // Debug log
    

    return NextResponse.json({ pets: pets.rows, totalPages: 10 }); // Adjust total pages
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch pets" }, { status: 500 });
  }
}