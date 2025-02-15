import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import PetFormCard from "@/app/admin/pets/_components/pet-form-card";
import { createRandomPet } from "@/mocks/pet";

export default async function PetDetailPage(props: any) {
  const pet = createRandomPet(parseInt(await props.params.id));

  if (!pet) {
    return <div>Pet not found</div>;
  }

  return (
    <>
      <AdminBreadcrumb
        items={[
          { label: "Media", href: "/shelter/" },
          { label: `${pet.name}` },
        ]}
      />
      <div className="flex flex-1 flex-col items-center gap-4 p-4">
        <PetFormCard pet={pet} />
      </div>
    </>
  );
}
