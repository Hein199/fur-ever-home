import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import { ShelterProfileForm } from "./_components/shelter-profile-form";

export default function ShelterProfilePage() {
  return (
    <div>
      <AdminBreadcrumb title="Shelter Profile" />
      <div className="my-8">
        <ShelterProfileForm />
      </div>
    </div>
  );
}
