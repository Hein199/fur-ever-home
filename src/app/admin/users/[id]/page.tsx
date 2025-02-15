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
import { createRandomUser } from "@/mocks/users";
import Link from "next/link";
import AdminBreadcrumb from "../../_components/admin-breadcrumb";

export default async function UserDetailPage(props: any) {
  const params = await props.params;
  const user = createRandomUser(parseInt(params.id));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <AdminBreadcrumb
        items={[
          { label: "User Management", href: "/admin/users" },
          { label: `User Details #${params.id}` },
        ]}
      />
      <div className="flex flex-1 flex-col items-center gap-4 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-id">User ID</Label>
                <Input id="user-id" value={user.id} readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue={user.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={user.phone} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end items-end">
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
