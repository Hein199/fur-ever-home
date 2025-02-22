import { approveShelter, rejectShelter } from '@/lib/actions';
import AppPagination from "@/components/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { getSheltersFromDB, getShelterPageCountFromDB } from "@/lib/database";
import { Check, XIcon } from "lucide-react";
import Link from "next/link";
import AdminBreadcrumb from "../_components/admin-breadcrumb";

export default async function Page(props: { searchParams: Promise<any> }) {
  const { page } = await props.searchParams;
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = await getShelterPageCountFromDB();
  const shelters = await getSheltersFromDB(pageInt);
  return (
    <>
      <AdminBreadcrumb title="Shelter Registration" />
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
                            search: `?origin=register`,
                          }}
                          className="text-primary underline"
                        >
                          {shelter.shelter_name}
                        </Link>
                      </TableCell>
                      <TableCell>{shelter.shelter_email}</TableCell>
                      <TableCell>{shelter.shelter_phone}</TableCell>
                      <TableCell>{shelter.location}</TableCell>
                      <TableCell className="flex gap-2 items-center justify-center">
                        {shelter.status === "Pending" && (
                          <>
                            {/* Approve Button */}
                            <form action={async () => {
                              'use server';
                              await approveShelter(shelter.shelter_id);
                            }}>
                              <Button variant="ghost" size="icon" color="primary">
                                <Check className="w-6 h-6" />
                              </Button>
                            </form>
                            {/* Reject Button */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  color="destructive"
                                >
                                  <XIcon className="w-6 h-6" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Are you absolutely sure?
                                  </DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will
                                    permanently reject {shelter.shelter_name} from the
                                    database.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                  </DialogClose>
                                  <form action={async () => {
                                    'use server';
                                    await rejectShelter(shelter.shelter_id);
                                  }}>
                                    <Button variant="destructive">Reject</Button>
                                  </form>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        {shelter.status === "Approved" && (
                          <Badge
                            className="text-green-700"
                            variant={"secondary"}
                          >
                            Approved
                          </Badge>
                        )}
                        {shelter.status === "Rejected" && (
                          <Badge variant="destructive">Rejected</Badge>
                        )}
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
