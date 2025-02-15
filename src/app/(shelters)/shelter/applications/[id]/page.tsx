import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createRandomApplication } from "@/mocks/application";

export default async function ApplicationDetailPage(
  props: any
) {
  const params = await props.params;
  const { id } = params;
  const intId = parseInt(id);
  const application = createRandomApplication(intId); // Assuming we fetch all applications for simplicity

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminBreadcrumb
        items={[
          { label: "Applications", href: "/shelter/applications" },
          { label: application.name, href: `/shelter/applications/${id}` },
        ]}
       />
      <div className="max-w-3xl mx-auto px-6 my-8">
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">
                      Name
                    </h3>
                    <p>{application.name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">
                      Email
                    </h3>
                    <p>{application.email}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">
                      Phone
                    </h3>
                    <p>{application.phone}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">
                      Address
                    </h3>
                    <p>{application.address}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">
                      Occupation
                    </h3>
                    <p>{application.occupation}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">
                      Reason for Adoption
                    </h3>
                    <p>{application.reason}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">
                      Pet ID
                    </h3>
                    <p>{application.petId}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500">
                      Application Date
                    </h3>
                    <p>{new Date(application.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Button variant="default">Approve</Button>
                <Button variant="destructive">Reject</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
