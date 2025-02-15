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
import { getPetPageCount, getPets } from "@/mocks/pet";
import { SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import AdminBreadcrumb from "../_components/admin-breadcrumb";

export default async function Page(props: { searchParams: Promise<any> }) {
  const { page } = (await props.searchParams);
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = getPetPageCount();
  const pets = getPets(pageInt);
  return (
    <>
      <AdminBreadcrumb title="Pet Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No pets found.
                    </TableCell>
                  </TableRow>
                ) : (
                  pets.map((pet) => (
                    <TableRow key={pet.id}>
                      <TableCell>{pet.id}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={pet.profileImage}
                            alt={pet.name}
                          />
                          <AvatarFallback>{pet.name[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/pets/${pet.id}`} className="text-primary underline">
                          {pet.name}
                        </Link>
                      </TableCell>
                      <TableCell>{pet.age}</TableCell>
                      <TableCell>{pet.gender}</TableCell>
                      <TableCell>{pet.location}</TableCell>
                      <TableCell className="flex gap-2 items-center justify-center">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/pets/${pet.id}`}>
                            <SquarePen className="w-6 h-6" />
                          </Link>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="icon" color="destructive">
                              <Trash className="w-6 h-6" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will permanently delete the pet.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                              </DialogClose>
                              <Button variant="destructive">Delete</Button>
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
