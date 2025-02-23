import { updatePetInDB, deletePetFromDB, getPetByIdFromDB } from "@/lib/database";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const petId = Number(params.id);
        if (!petId) return NextResponse.json({ error: "Invalid pet ID" }, { status: 400 });

        const pet = await getPetByIdFromDB(petId);
        if (!pet) return NextResponse.json({ error: "Pet not found" }, { status: 404 });

        return NextResponse.json({ pet });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const petId = Number(params.id);
        if (!petId) return NextResponse.json({ error: "Invalid pet ID" }, { status: 400 });

        const data = await request.json();
        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
        }

        const updatedPet = await updatePetInDB(petId, data);
        if (!updatedPet) return NextResponse.json({ error: "Pet update failed" }, { status: 404 });

        return NextResponse.json({ message: "Pet updated successfully", pet: updatedPet });
    } catch (error) {
        console.error("PUT Error:", error);
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
