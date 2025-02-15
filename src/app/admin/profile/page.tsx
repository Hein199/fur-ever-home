import AdminBreadcrumb from "../_components/admin-breadcrumb";
import ProfileForm from "../_components/profile-form";

export default function Page() {
  return (
    <>
      <AdminBreadcrumb title="Profile" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ProfileForm />
      </div>
    </>
  );
}
