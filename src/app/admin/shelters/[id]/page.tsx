import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRandomShelter } from "@/mocks/shelter";
import Link from "next/link";
import AdminBreadcrumb from "../../_components/admin-breadcrumb";

export default async function ShelterDetailPage(props: any) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const shelter = createRandomShelter(parseInt(params.id));
  const origin: "management" | "register" = searchParams.origin || "management";

  if (!shelter) {
    return <div>Shelter not found</div>;
  }

  return (
    <>
      <AdminBreadcrumb
        items={[
          origin === "management"
            ? { label: "Shelter Management", href: "/admin/shelters" }
            : {
                label: "Shelter Registration",
                href: "/admin/shelters-registration",
              },
          { label: `Shelter Details #${params.id}` },
        ]}
      />
      <div className="flex flex-1 flex-col items-center gap-4 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Shelter Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={shelter.profileImage} alt={shelter.name} />
                <AvatarFallback>{shelter.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shelter-id">Shelter ID</Label>
                <Input id="shelter-id" value={shelter.id} readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={shelter.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={shelter.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={shelter.phone} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  defaultValue={shelter.capacity.toString()}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="available-from">Available From</Label>
                  <Input
                    id="available-from"
                    defaultValue={shelter.availableTime.from}
                    type="time"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="available-to">Available To</Label>
                  <Input
                    id="available-to"
                    defaultValue={shelter.availableTime.to}
                    type="time"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end items-end gap-2">
            <Button>Save Changes</Button>
            {shelter.status === "pending" && origin === "register" && (
              <div className="flex gap-2">
                <Button variant="default">Approve</Button>
                <Button variant="destructive">Reject</Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
