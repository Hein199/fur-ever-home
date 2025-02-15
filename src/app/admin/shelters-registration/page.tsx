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
import { getShelterPageCount, getShelters } from "@/mocks/shelter";
import { Check, XIcon } from "lucide-react";
import Link from "next/link";
import AdminBreadcrumb from "../_components/admin-breadcrumb";

export default async function Page(props: { searchParams: Promise<any> }) {
  const { page } = await props.searchParams;
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = getShelterPageCount();
  const shelters = getShelters(pageInt);
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
                    <TableCell colSpan={5} className="h-24 text-center">
                      No shelters found.
                    </TableCell>
                  </TableRow>
                ) : (
                  shelters.map((shelter) => (
                    <TableRow key={shelter.id}>
                      <TableCell>{shelter.id}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={shelter.profileImage}
                            alt={shelter.name}
                          />
                          <AvatarFallback>{shelter.name[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={{
                            pathname: `/admin/shelters/${shelter.id}`,
                            search: `?origin=register`,
                          }}
                          className="text-primary underline"
                        >
                          {shelter.name}
                        </Link>
                      </TableCell>
                      <TableCell>{shelter.email}</TableCell>
                      <TableCell>{shelter.phone}</TableCell>
                      <TableCell>{shelter.location}</TableCell>
                      <TableCell className="flex gap-2 items-center justify-center">
                        {shelter.status === "pending" && (
                          <>
                            <Button variant="ghost" size="icon" color="primary">
                              <Check className="w-6 h-6" />
                            </Button>
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
                                    permanently reject {shelter.name} from the
                                    database.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                  </DialogClose>
                                  <Button variant="destructive">Reject</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        {shelter.status === "approved" && (
                          <Badge
                            className="text-green-700"
                            variant={"secondary"}
                          >
                            Approved
                          </Badge>
                        )}
                        {shelter.status === "rejected" && (
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
