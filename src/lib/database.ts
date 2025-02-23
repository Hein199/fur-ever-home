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
            `SELECT shelter_id, shelter_name, shelter_email, shelter_phone, 
             location, capacity, opening_time, closing_time, avatar 
             FROM shelter WHERE shelter_id = $1`,
            [shelterId]
        );
        return result.rows[0] ? {
            ...result.rows[0],
            availableTime: {
                from: result.rows[0].opening_time,
                to: result.rows[0].closing_time
            }
        } : null;
    } catch (error) {
        console.error("Error fetching shelter:", error);
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

export const updateShelterInDB = async (
    shelterId: number,
    data: {
        shelter_name: string;
        shelter_email: string;
        shelter_phone: string;
        location: string;
        capacity: number;
        opening_time: string;
        closing_time: string;
        avatar?: string;
    }
) => {
    try {
        const result = await query(
            `UPDATE shelter 
             SET shelter_name = $1,
                 shelter_email = $2,
                 shelter_phone = $3,
                 location = $4,
                 capacity = $5,
                 opening_time = $6,
                 closing_time = $7,
                 avatar = COALESCE($8, avatar)
             WHERE shelter_id = $9
             RETURNING *`,
            [
                data.shelter_name,
                data.shelter_email,
                data.shelter_phone,
                data.location,
                data.capacity,
                data.opening_time,
                data.closing_time,
                data.avatar,
                shelterId
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating shelter:", error);
        throw error;
    }
};

export const getAdminByIdFromDB = async (adminId: number) => {
    try {
        const result = await query(
            "SELECT admin_id, admin_name, admin_email, admin_phone FROM admin WHERE admin_id = $1",
            [adminId]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error fetching admin by ID:", error);
        return null;
    }
};

export const updateAdminInDB = async (
    adminId: number,
    data: {
        admin_name: string;
        admin_email: string;
        admin_phone: string;
    }
) => {
    try {
        const result = await query(
            `UPDATE admin 
            SET admin_name = $1,
                admin_email = $2, 
                admin_phone = $3
            WHERE admin_id = $4
            RETURNING *`,
            [
                data.admin_name,
                data.admin_email,
                data.admin_phone,
                adminId
            ]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error updating admin:", error);
        throw error;
    }
};

// src/lib/database.ts
export const getAppointmentsForShelter = async (shelterId: number, page: number = 1, limit: number = 10) => {
    try {
        const offset = (page - 1) * limit;
        const result = await query(
            `SELECT appointment.*, users.user_name, users.user_email
             FROM appointment
             JOIN users ON appointment.user_id = users.user_id
             WHERE appointment.shelter_id = $1
             ORDER BY appointment.appointment_date, appointment.appointment_time
             LIMIT $2 OFFSET $3`,
            [shelterId, limit, offset]
        );
        return result.rows;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
};

export const getAppointmentPageCountForShelter = async (shelterId: number, limit: number = 10) => {
    try {
        const result = await query(
            "SELECT COUNT(*) FROM appointment WHERE shelter_id = $1",
            [shelterId]
        );
        return Math.ceil(Number(result.rows[0].count) / limit);
    } catch (error) {
        console.error("Error fetching appointment count:", error);
        return 1;
    }
};