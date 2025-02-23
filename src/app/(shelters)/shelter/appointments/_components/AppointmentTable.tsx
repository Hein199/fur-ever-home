"use client";

import { useAuth } from "@/context/auth-context";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import AppPagination from "@/components/pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Appointment {
  appointment_id: number;
  appointment_date: string;
  appointment_time: string;
  user_name: string;
  user_email: string;
}

export default function AppointmentTable({ initialPage = 1 }: { initialPage?: number }) {
  const { user } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "shelter") {
      const fetchAppointments = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`/api/appointments?shelterId=${user.id}&page=${currentPage}`);
          if (!response.ok) throw new Error("Failed to fetch appointments");
          const data = await response.json();
          setAppointments(data.appointments);
          setPageCount(data.pageCount);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAppointments();
    }
  }, [user, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/shelter/appointments?page=${newPage}`);
  };

  if (!user || user.role !== "shelter") {
    return <div>Unauthorized</div>;
  }

  if (isLoading) {
    return <div>Loading appointments...</div>;
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
                <TableCell colSpan={5} className="h-24 text-center">
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
        <AppPagination
          page={currentPage}
          totalPage={pageCount}
          onPageChange={handlePageChange}
        />
      </CardFooter>
    </Card>
  );
}