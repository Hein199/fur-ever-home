import { getShelterPageCount, getShelters } from '@/mocks/shelter';

import { deleteShelter } from '@/lib/actions';
import AppPagination from "@/components/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash } from "lucide-react";
import AdminBreadcrumb from "../_components/admin-breadcrumb";
import Link from "next/link";

export default async function Page({ searchParams }: { searchParams: { page: string } }) {
  const pageInt = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageCount = await getShelterPageCount(); // Await the page count
  const shelters = await getShelters(pageInt); // Await the shelters data

  return (
    <>
      <AdminBreadcrumb title="Shelter Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Shelter Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shelters.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No shelters found.
                    </TableCell>
                  </TableRow>
                ) : (
                  shelters.map((shelter) => (
                    <TableRow key={shelter.shelter_id}>
                      <TableCell>{shelter.shelter_id}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={shelter.avatar}
                            alt={shelter.shelter_name}
                          />
                          <AvatarFallback>{shelter.shelter_name[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={{
                            pathname: `/admin/shelters/${shelter.shelter_id}`,
                            search: `?origin=management`,
                          }}
                          className="text-primary underline"
                        >
                          {shelter.shelter_name}
                        </Link>
                      </TableCell>
                      <TableCell>{shelter.shelter_email}</TableCell>
                      <TableCell>{shelter.shelter_phone}</TableCell>
                      <TableCell>{shelter.location}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          color="primary"
                          asChild
                        >
                          <Link
                            href={`/admin/shelters/${shelter.shelter_id}`}
                            className="text-primary underline"
                          >
                            <SquarePen className="w-6 h-6" />
                          </Link>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="icon"
                              color="destructive"
                            >
                              <Trash className="w-6 h-6" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will permanently
                                delete the shelter and remove its data from the database.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                              </DialogClose>
                              <form action={deleteShelter}>
                                <input
                                  type="hidden"
                                  name="shelterId"
                                  value={shelter.shelter_id}
                                />
                                <Button variant="destructive" type="submit">
                                  Delete
                                </Button>
                              </form>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
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