import { updatePetInDB, deletePetFromDB, getPetByIdFromDB } from "@/lib/database";
import { NextResponse } from "next/server";

const IMAGEKIT_URL = "https://ik.imagekit.io/1cdqvkf2u";
const DEFAULT_IMAGE = `${IMAGEKIT_URL}/default-pet-avatar.jpg`;

export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        if (!context.params || !context.params.id) {
            return NextResponse.json({ error: "Missing pet ID" }, { status: 400 });
        }

        const petId = Number(context.params.id);
        if (isNaN(petId)) {
            return NextResponse.json({ error: "Invalid pet ID" }, { status: 400 });
        }

        console.log("Fetching pet from DB with ID:", petId);
        const pet = await getPetByIdFromDB(petId);

        if (!pet) {
            console.warn("Pet not found in DB");
            return NextResponse.json({ error: "Pet not found" }, { status: 404 });
        }

        // Ensure `avatar` has a valid ImageKit path
        pet.avatar = pet.avatar && pet.avatar !== "undefined"
            ? `${IMAGEKIT_URL}/${pet.avatar}`
            : DEFAULT_IMAGE;

        console.log("Pet found:", pet);
        return NextResponse.json(pet);
    } catch (error) {
        console.error("GET Pet API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const petId = Number(params.id);
        if (!petId) return NextResponse.json({ error: "Invalid pet ID" }, { status: 400 });

        const result = await deletePetFromDB(petId);
        if (!result?.success) return NextResponse.json({ error: "Failed to delete pet" }, { status: 500 });

        return NextResponse.json({ message: "Pet deleted successfully" });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
