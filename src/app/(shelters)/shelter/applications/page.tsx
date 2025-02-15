import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import AppPagination from "@/components/pagination";
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
import { getApplicationPageCount, getApplications } from "@/mocks/application";
import { Check, XIcon } from "lucide-react";
import Link from "next/link";

export default async function Page(props: { searchParams: Promise<any> }) {
  const { page } = (await props.searchParams);
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = getApplicationPageCount();
  const applications = getApplications(pageInt);
  return (
    <>
      <AdminBreadcrumb title="Application Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No applications found.
                    </TableCell>
                  </TableRow>
                ) : (
                  applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>{application.id}</TableCell>
                      <TableCell>
                        {new Date(application.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/shelter/applications/${application.id}`}
                          className="text-primary underline"
                        >
                          {application.name}
                        </Link>
                      </TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell className="flex gap-2 items-center justify-center">
                        {application.status === "pending" && (
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
                                    permanently delete your account and remove
                                    your data from our servers.
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
                          </>
                        )}
                        {application.status === "approved" && (
                          <Badge
                            className="text-green-700"
                            variant={"secondary"}
                          >
                            Approved
                          </Badge>
                        )}
                        {application.status === "rejected" && (
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
