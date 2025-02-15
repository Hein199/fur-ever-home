import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import PetFormCard from "@/app/admin/pets/_components/pet-form-card";

const PetRegisterPage = () => {
  return (
    <div>
      <AdminBreadcrumb
        items={[
          { label: "Media", href: "/shelter" },
          { label: "Add New Pet", href: "/shelter/pets/new" },
        ]}
      />
      <div className="my-8 flex flex-col justify-center items-center">
        <h1 className="text-lg text-primary mb-4">Register a new pet</h1>
        <PetFormCard />
      </div>
    </div>
  );
};

export default PetRegisterPage;
