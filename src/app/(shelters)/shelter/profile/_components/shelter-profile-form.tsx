"use client";
import { useFormState } from 'react-dom';
import { useAuth } from '@/context/auth-context';
import { useActionState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { updateShelterProfile } from '@/lib/actions';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shelter } from "@/types/shelter";
import Image from "next/image";

export function ShelterProfileForm({
  defaultValues,
}: {
  defaultValues?: Shelter;
}) {
  const [state, formAction] = useActionState(updateShelterProfile, null);
  const { toast } = useToast();
  const { logout } = useAuth();

  useEffect(() => {
    if (state?.success) {
      toast({ title: "Success", description: state.message });
    } else if (state?.success === false) {
      toast({ title: "Error", description: state.message, variant: "destructive" });
    }
  }, [state, toast]);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shelter Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="shelterId" value={defaultValues?.shelter_id} />

          <div className="space-y-6">
            {defaultValues?.avatar && (
              <Image
                src={defaultValues.avatar}
                alt={defaultValues.shelter_name}
                width={192}
                height={192}
                className="mx-auto h-48 w-48 object-cover rounded-lg"
              />
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Shelter Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={defaultValues?.shelter_name}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={defaultValues?.shelter_email}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={defaultValues?.shelter_phone}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  defaultValue={defaultValues?.capacity}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeFrom">Opening Time</Label>
                <Input
                  id="timeFrom"
                  name="timeFrom"
                  defaultValue={defaultValues?.availableTime.from}
                  type="time"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeTo">Closing Time</Label>
                <Input
                  id="timeTo"
                  name="timeTo"
                  defaultValue={defaultValues?.availableTime.to}
                  type="time"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Textarea
                id="location"
                name="location"
                rows={3}
                defaultValue={defaultValues?.location}
              />
            </div>

            <Button type="submit" className="w-full">
              Save Changes
            </Button>

            <Button
              type="button"
              onClick={logout}
              className="w-full"
              variant="destructive"
            >
              Logout
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}