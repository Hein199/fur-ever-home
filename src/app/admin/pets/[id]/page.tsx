import { createRandomPet } from "@/mocks/pet";
import AdminBreadcrumb from "../../_components/admin-breadcrumb";
import PetFormCard from "../_components/pet-form-card";

export default async function PetDetailPage(props: any) {
  const pet = createRandomPet(parseInt(await props.params.id));

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <>
      <AdminBreadcrumb
        items={[
          { label: "Pet Management", href: "/admin/pets" },
          { label: `${pet.name}` },
        ]}
      />
      <div className="flex flex-1 flex-col items-center gap-4 p-4">
        <PetFormCard pet={pet} />
      </div>
    </>
  );
}
