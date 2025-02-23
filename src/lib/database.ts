// import { Pool } from "pg";
import { Pool } from '@neondatabase/serverless';
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

// Function to get users from the database
export const getUsersFromDB = async (page: number = 1, limit: number = 10) => {
    try {
        const offset = (page - 1) * limit;

        console.log("Fetching users with limit:", limit, "and offset:", offset);

        const result = await query(
            "SELECT user_id, avatar, user_name, user_email, user_phone FROM users ORDER BY user_id LIMIT $1 OFFSET $2",
            [limit, offset]
        );

        return result.rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

// Function to get total user count for pagination
export const getUserPageCountFromDB = async (limit: number = 10) => {
    try {
        const result = await query("SELECT COUNT(*) FROM users");
        return Math.ceil(Number(result.rows[0].count) / limit);
    } catch (error) {
        console.error("Error fetching user count:", error);
        return 1;
    }
};

// Function to get a user by ID from the database
export const getUserByIdFromDB = async (userId: number) => {
    try {
        const result = await query(
            "SELECT user_id, user_name, user_email, user_phone, avatar, location FROM users WHERE user_id = $1",
            [userId]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
};

// Function to update a user's information in the database
export const updateUserInDB = async (
    userId: number,
    data: {
        user_name: string;
        user_email: string;
        user_phone: string;
        location: string;
        avatar?: string;
    }
) => {
    try {
        const result = await query(
            `UPDATE users 
            SET user_name = $1,
                user_email = $2, 
                user_phone = $3, 
                location = $4,
                avatar = COALESCE($5, avatar)
            WHERE user_id = $6
            RETURNING *`,
            [
                data.user_name,
                data.user_email,
                data.user_phone,
                data.location,
                data.avatar,
                userId
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

// Function to delete a user from the database
export const deleteUserFromDB = async (userId: number) => {
    try {
        await query('DELETE FROM users WHERE user_id = $1', [userId]);
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
};


// Fetch pets with pagination
export const getPetsFromDB = async (page: number = 1, limit: number = 10) => {
    try {
        const offset = (page - 1) * limit;
        const pets = await query(`
            SELECT pet.pet_id, pet.pet_name, pet.age, pet.gender, pet.avatar, pet.location, 
                   pet.weight, pet.color, pet.size, pet.status, pet.about,
                   shelter.shelter_name, users.user_name
            FROM pet
            LEFT JOIN shelter_pet ON pet.pet_id = shelter_pet.pet_id
            LEFT JOIN shelter ON shelter_pet.shelter_id = shelter.shelter_id
            LEFT JOIN user_pet ON pet.pet_id = user_pet.pet_id
            LEFT JOIN users ON user_pet.user_id = users.user_id
            ORDER BY pet.pet_id
            LIMIT $1 OFFSET $2
        `, [limit, offset]);

        return pets.rows;
    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
};

// Fetch total pet count for pagination
export const getPetPageCountFromDB = async (limit: number = 10) => {
    try {
        const result = await query("SELECT COUNT(*) FROM pet");
        return Math.ceil(Number(result.rows[0].count) / limit);
    } catch (error) {
        console.error("Error fetching pet count:", error);
        return 1;
    }
};

export const getPetByIdFromDB = async (petId: number) => {
    try {
        const pet = await query(
            `SELECT pet.pet_id, pet.pet_name, pet.age, pet.gender, pet.avatar, pet.location, 
                    pet.weight, pet.color, pet.size, pet.status, pet.about,  -- 🔹 Added missing fields
                    shelter.shelter_name, users.user_name
             FROM pet
             LEFT JOIN shelter_pet ON pet.pet_id = shelter_pet.pet_id
             LEFT JOIN shelter ON shelter_pet.shelter_id = shelter.shelter_id
             LEFT JOIN user_pet ON pet.pet_id = user_pet.pet_id
             LEFT JOIN users ON user_pet.user_id = users.user_id
             WHERE pet.pet_id = $1`,
            [petId]
        );
        return pet.rows[0] || null;
    } catch (error) {
        console.error("Error fetching pet by ID:", error);
        return null;
    }
};

// Create a new pet
export const createPetInDB = async (data: any) => {
    try {
        const result = await query(
            `INSERT INTO pet (pet_name, age, gender, avatar, location, weight, color, size, status, about)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING *`,
            [
                data.pet_name,
                data.age,
                data.gender,
                data.avatar,
                data.location,
                data.weight,
                data.color,
                data.size,
                data.status,
                data.about,
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error creating pet:", error);
        throw error;
    }
};

// Update pet
export const updatePetInDB = async (petId: number, data: any) => {
    try {
        const result = await query(
            `UPDATE pet 
             SET pet_name = $1, age = $2, gender = $3, avatar = $4, location = $5,
                 weight = $6, color = $7, size = $8, status = $9, about = $10
             WHERE pet_id = $11
             RETURNING *`,
            [
                data.pet_name,
                data.age,
                data.gender,
                data.avatar,
                data.location,
                data.weight,
                data.color,
                data.size,
                data.status,
                data.about,
                petId,
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating pet:", error);
        throw error;
    }
};

// Delete pet
export const deletePetFromDB = async (petId: number) => {
    try {
        await query('DELETE FROM pet WHERE pet_id = $1', [petId]);
        return { success: true };
    } catch (error) {
        console.error("Error deleting pet:", error);
        return { success: false, error: "Failed to delete pet" };
    }
};

// src/lib/database.ts
export const getShelterByIdFromDB = async (shelterId: number) => {
    try {
      const result = await query(
        "SELECT * FROM shelter WHERE shelter_id = $1",
        [shelterId]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error("Error fetching shelter by ID:", error);
      return null;
    }
  };
  // src/lib/database.ts

// Function to get shelters from the database
export const getSheltersFromDB = async (page: number = 1, limit: number = 10) => {
    try {
        const offset = (page - 1) * limit;
        const result = await query(
            "SELECT * FROM shelter ORDER BY shelter_id LIMIT $1 OFFSET $2",
            [limit, offset]
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching shelters:", error);
        return [];
    }
};

// Function to get total shelter count for pagination
export const getShelterPageCountFromDB = async (limit: number = 10) => {
    try {
        const result = await query("SELECT COUNT(*) FROM shelter");
        return Math.ceil(Number(result.rows[0].count) / limit);
    } catch (error) {
        console.error("Error fetching shelter count:", error);
        return 1;
    }
};