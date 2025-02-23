import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import AppointmentTable from "./_components/AppointmentTable";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  return (
    <>
      <AdminBreadcrumb title="Appointment Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Suspense fallback={<div>Loading appointments...</div>}>
          <AppointmentTable initialPage={page} />
        </Suspense>
      </div>
    </>
  );
}