import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createRandomReport } from "@/mocks/report";
import AdminBreadcrumb from "../../_components/admin-breadcrumb";

export default async function Page(props: any) {
  const params = await props.params;
  const report = createRandomReport(parseInt(params.id));

  return (
    <>
      <AdminBreadcrumb
        items={[
          { label: "Report Management", href: "/admin/reports" },
          { label: `Report Details #${params.id}` },
        ]}
      />
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Report Details #{params.id}</h1>
          {report.status === "pending" ? (
            <Button variant="default">Resolve Report</Button>
          ) : (
            <Badge variant="secondary">Resolved</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Title</p>
                <p className="font-medium">{report.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reason</p>
                <Badge variant="outline">{report.reason}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="font-medium">{report.descirption}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  variant={
                    report.status === "pending" ? "outline" : "secondary"
                  }
                >
                  {report.status}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reporter Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Reporter Name</p>
                <p className="font-medium">{report.reporterName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reporter ID</p>
                <p className="font-medium">{report.reporterId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="font-medium">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
