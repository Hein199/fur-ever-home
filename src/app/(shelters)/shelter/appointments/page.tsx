import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import AppointmentTable from "./_components/AppointmentTable";
import AppPagination from "@/components/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAppointmentsForShelter, getAppointmentPageCountForShelter } from "@/lib/database";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getAppointmentPageCount, getAppointments } from "@/mocks/appointment";


export default function Page({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;




  return (
    <>
      <AdminBreadcrumb title="Appointment Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AppointmentTable initialPage={page} />
        
        </div>
    </>
  );
}