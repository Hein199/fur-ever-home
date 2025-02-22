import { updatePetInDB, deletePetFromDB, getPetByIdFromDB } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const petId = parseInt(params.id);
        if (isNaN(petId)) {
            return NextResponse.json({ error: "Invalid pet ID" }, { status: 400 });
        }

        const pet = await getPetByIdFromDB(petId);
        if (!pet) {
            return NextResponse.json({ error: "Pet not found" }, { status: 404 });
        }

        return NextResponse.json({ pet });
    } catch (error) {
        return NextResponse.json({ error: "Server error while fetching pet" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const petId = parseInt(params.id);
        if (isNaN(petId)) {
            return NextResponse.json({ error: "Invalid pet ID" }, { status: 400 });
        }

        const data = await request.json();
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        const updatedPet = await updatePetInDB(petId, data);
        if (!updatedPet) {
            return NextResponse.json({ error: "Pet not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Pet updated successfully", pet: updatedPet });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update pet" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const petId = parseInt(params.id);
        if (isNaN(petId)) {
            return NextResponse.json({ error: "Invalid pet ID" }, { status: 400 });
        }

        const result = await deletePetFromDB(petId);
        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ message: "Pet deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete pet" }, { status: 500 });
    }
}
