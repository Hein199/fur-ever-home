import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import AppPagination from "@/components/pagination";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAppointmentPageCount, getAppointments } from "@/mocks/appointment";
import Link from "next/link";

export default async function Page(props: { searchParams: Promise<any> }) {
  const { page } = await props.searchParams;
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = getAppointmentPageCount();
  const appointments = getAppointments(pageInt);

  return (
    <>
      <AdminBreadcrumb title="Appointment Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Visitor Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No appointments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.id}</TableCell>
                      <TableCell>
                        {new Date(appointment.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.user.name}</TableCell>
                      <TableCell>{appointment.user.email}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="mt-4">
            <AppPagination page={pageInt} totalPage={pageCount} />
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
