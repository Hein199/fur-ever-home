import AppPagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getReportPageCount, getReports } from "@/mocks/report";
import Link from "next/link";
import AdminBreadcrumb from "../_components/admin-breadcrumb";

export default async function Page(props: { searchParams: Promise<any> }) {
  const { page } = (await props.searchParams);
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = getReportPageCount();
  const reports = getReports(pageInt);

  return (
    <>
      <AdminBreadcrumb title="Report Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Report Title</TableHead>
                  <TableHead>Reporter ID</TableHead>
                  <TableHead>Reporter Name</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No reports found.
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>
                        <Link
                          href={`/admin/reports/${report.id}`}
                          className="text-primary underline"
                        >
                          {report.name}
                        </Link>
                      </TableCell>
                      <TableCell>{report.reporterId}</TableCell>
                      <TableCell>{report.reporterName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{report.reason}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Badge
                          variant={
                            report.status === "pending" ? "outline" : "secondary"
                          }
                        >
                          {report.status}
                        </Badge>

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