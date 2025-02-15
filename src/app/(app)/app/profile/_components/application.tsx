import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAppointments } from "@/mocks/appointment";
import App from "next/app";


const Applications = () => {
  const appointments = getAppointments(1);
  return (<div className="flex flex-1 flex-col gap-4 p-4">
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Shelter Name</TableHead>
              <TableHead>Shelter Location</TableHead>
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
                  <TableCell>{appointment.shelter.name}</TableCell>
                  <TableCell>{appointment.shelter.location}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>

    </Card>
  </div>)
}
export default Applications;