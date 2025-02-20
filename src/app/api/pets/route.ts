import { query } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "12";

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    if (isNaN(pageInt) || isNaN(limitInt) || pageInt < 1 || limitInt < 1) {
        return NextResponse.json(
            { error: "Invalid page or limit parameters" },
            { status: 400 }
        );
    }

    const offset = (pageInt - 1) * limitInt;

    try {
        // Fetch pets from the database
        const pets = await query(`
        SELECT DISTINCT ON (pet.pet_id)
          pet.*,
          shelter.shelter_id,
          shelter.shelter_name,
          users.user_id,
          users.user_name
        FROM pet
        LEFT JOIN shelter_pet ON pet.pet_id = shelter_pet.pet_id
        LEFT JOIN shelter ON shelter_pet.shelter_id = shelter.shelter_id
        LEFT JOIN user_pet ON pet.pet_id = user_pet.pet_id
        LEFT JOIN users ON user_pet.user_id = users.user_id
        ORDER BY pet.pet_id
        LIMIT $1 OFFSET $2
      `, [limitInt, offset]);

        // Get accurate count of unique pets
        const totalCount = await query(`
            SELECT COUNT(*) FROM (
              SELECT DISTINCT pet.pet_id FROM pet
              LEFT JOIN shelter_pet ON pet.pet_id = shelter_pet.pet_id
              LEFT JOIN user_pet ON pet.pet_id = user_pet.pet_id
            ) AS unique_pets
          `);
        const totalPages = Math.ceil(Number(totalCount.rows[0].count) / limitInt);

        return NextResponse.json({
            pets: pets.rows.map(pet => ({
                ...pet,
                shelter: pet.shelter_id ? {
                    id: pet.shelter_id,
                    shelter_name: pet.shelter_name
                } : null,
                owner: pet.user_id ? {
                    id: pet.user_id,
                    user_name: pet.user_name
                } : null
            })),
            totalPages,
        });
    } catch (error) {
        console.error("Error fetching pets:", error);
        return NextResponse.json(
            { error: "Failed to fetch pets" },
            { status: 500 }
        );
    }
}