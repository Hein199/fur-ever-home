// src/app/admin/shelters/[id]/ShelterDetailPage.tsx
'use client';

import { useActionState } from 'react';
import { updateShelter } from '@/lib/actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdminBreadcrumb from '../../_components/admin-breadcrumb';

export default function ShelterDetailPage({
  shelter,
  origin,
}: {
  shelter: any;
  origin: string;
}) {
  // Use the useFormState hook to handle form submission
  const [state, formAction] = useActionState(updateShelter, null);

  return (
    <>
      <AdminBreadcrumb
        items={[
          origin === 'management'
            ? { label: 'Shelter Management', href: '/admin/shelters' }
            : {
                label: 'Shelter Registration',
                href: '/admin/shelters-registration',
              },
          { label: `Shelter Details #${shelter.shelter_id}` },
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
                <AvatarImage src={shelter.avatar} alt={shelter.shelter_name} />
                <AvatarFallback>{shelter.shelter_name[0]}</AvatarFallback>
              </Avatar>
            </div>

            <form action={formAction}>
              <input type="hidden" name="shelterId" value={shelter.shelter_id} />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shelter-id">Shelter ID</Label>
                  <Input id="shelter-id" value={shelter.shelter_id} readOnly />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={shelter.shelter_name}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    defaultValue={shelter.shelter_email}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={shelter.shelter_phone}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    defaultValue={shelter.capacity.toString()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="available-from">Available From</Label>
                    <Input
                      id="available-from"
                      name="available-from"
                      defaultValue={shelter.opening_time}
                      type="time"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="available-to">Available To</Label>
                    <Input
                      id="available-to"
                      name="available-to"
                      defaultValue={shelter.closing_time}
                      type="time"
                    />
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-end items-end gap-2 mt-4">
                <Button type="submit">Save Changes</Button>
                {shelter.status === 'Pending' && origin === 'register' && (
                  <div className="flex gap-2">
                    <Button variant="default">Approve</Button>
                    <Button variant="destructive">Reject</Button>
                  </div>
                )}
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        {/* Display success/error messages */}
        {state?.success && (
          <div className="text-green-600">{state.message}</div>
        )}
        {state?.success === false && (
          <div className="text-red-600">{state.message}</div>
        )}
      </div>
    </>
  );
}