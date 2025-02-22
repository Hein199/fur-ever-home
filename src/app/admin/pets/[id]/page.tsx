import { getPetByIdFromDB } from "@/lib/database";
import AdminBreadcrumb from "../../_components/admin-breadcrumb";
import PetFormCard from "../_components/pet-form-card";
import { notFound } from "next/navigation";

export default async function PetDetailPage({ params }: { params: { id?: string } }) {
  if (!params?.id) {
    console.error("Missing params or ID:", params);
    return notFound();
  }

  // Convert `id` safely to a number
  const petId = Number(params.id);

  // Validate `petId`
  if (isNaN(petId) || petId <= 0) {
    console.error("Invalid Pet ID:", params.id);
    return notFound();
  }

  // Fetch pet data from the database
  const pet = await getPetByIdFromDB(petId);

  if (!pet) return notFound(); // Handle pet not found case

  return (
    <>
      <AdminBreadcrumb
        items={[
          { label: "Pet Management", href: "/admin/pets" },
          { label: `Pet Details #${pet.pet_id}` },
        ]}
      />
      <div className="flex flex-1 flex-col items-center gap-4 p-4 mx-auto w-full max-w-7xl">
        <PetFormCard pet={pet} />
      </div>
    </>
  );
}
