import { query } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 10;
  const userId = searchParams.get("userId");
  const offset = (page - 1) * limit;

  //   try {
  //     // Fetch pets from the database
  //     const pets = await query(`
  //       SELECT pet_id, pet_name, age, gender, location, avatar, weight, color, size, status FROM pet
  //       ORDER BY pet_id
  //       LIMIT $1 OFFSET $2`, [limit, offset]);

  //     const totalCountResult = await query("SELECT COUNT(*) FROM pet");
  //     const totalPets = parseInt(totalCountResult.rows[0].count, 10);
  //     const totalPages = Math.ceil(totalPets / limit);

  //     console.log("API Response:", pets.rows); // Debug log


  //     return NextResponse.json({ pets: pets.rows, totalPages: 10 }); // Adjust total pages
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     return NextResponse.json({ error: "Failed to fetch pets" }, { status: 500 });
  //   }
  // }

  try {
    let queryString = `
    SELECT pet.pet_id, pet.pet_name, pet.age, pet.gender, pet.avatar, pet.location, 
           pet.weight, pet.color, pet.size, pet.status, pet.about,
           shelter.shelter_name, users.user_name
    FROM pet
    LEFT JOIN shelter_pet ON pet.pet_id = shelter_pet.pet_id
    LEFT JOIN shelter ON shelter_pet.shelter_id = shelter.shelter_id
    LEFT JOIN user_pet ON pet.pet_id = user_pet.pet_id
    LEFT JOIN users ON user_pet.user_id = users.user_id
  `;

    const queryParams = [limit, offset];

    if (userId) {
      queryString += " WHERE users.user_id = $3";
      queryParams.push(parseInt(userId, 10));
    }

    queryString += " ORDER BY pet.pet_id LIMIT $1 OFFSET $2";

    const pets = await query(queryString, queryParams);

    const totalCountResult = await query("SELECT COUNT(*) FROM pet");
    const totalPets = parseInt(totalCountResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalPets / limit);

    return NextResponse.json({ pets: pets.rows, totalPages });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch pets" }, { status: 500 });
  }
}