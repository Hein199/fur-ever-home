// import { Pool } from "pg";
import { Pool } from '@neondatabase/serverless';
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    // user: process.env.DB_USER,
    // host: process.env.DB_HOST,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASSWORD,
    // port: Number(process.env.DB_PORT) || 5432,
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