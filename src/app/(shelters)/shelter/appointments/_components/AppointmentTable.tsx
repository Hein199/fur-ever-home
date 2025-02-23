// src/app/(shelters)/shelter/appointments/_components/AppointmentTable.tsx
"use client";

import { useAuth } from "@/context/auth-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import AppPagination from "@/components/pagination";
import { getAppointmentsForShelter, getAppointmentPageCountForShelter } from "@/lib/database";
import { useEffect, useState } from "react";

export default function AppointmentTable({ initialPage = 1 }: { initialPage?: number }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    if (user && user.role === 'shelter') {
      const fetchAppointments = async () => {
        const response = await fetch(`/api/appointments?shelterId=${user.id}&page=${currentPage}`);
        const data = await response.json();
        setAppointments(data.appointments);
        setPageCount(data.pageCount);
      };
      fetchAppointments();
    }
  }, [user, currentPage]);

  if (!user || user.role !== 'shelter') {
    return <div>Unauthorized</div>;
  }

  return (
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
                <TableRow key={appointment.appointment_id}>
                  <TableCell>{appointment.appointment_id}</TableCell>
                  <TableCell>
                    {new Date(appointment.appointment_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{appointment.appointment_time}</TableCell>
                  <TableCell>{appointment.user_name}</TableCell>
                  <TableCell>{appointment.user_email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="mt-4">
        <AppPagination page={currentPage} totalPage={pageCount} onPageChange={setCurrentPage} />
      </CardFooter>
    </Card>
  );
}