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
import { getUserPageCount, getUsers } from "@/mocks/users";
import { SquarePen, Trash } from "lucide-react";
import Link from "next/link";
import AdminBreadcrumb from "../_components/admin-breadcrumb";

export default async function Page(props: { searchParams: Promise<any> }) {
  const { page } = (await props.searchParams);
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = getUserPageCount();
  const users = getUsers(pageInt);
  return (
    <>
      <AdminBreadcrumb title="User Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage
                            src={user.profileImage}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/users/${user.id}`} className="text-primary underline">
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          color="primary"
                          asChild
                        >
                          <Link href={`/admin/users/${user.id}`}>
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
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
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
