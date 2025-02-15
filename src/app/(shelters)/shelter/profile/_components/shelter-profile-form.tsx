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
  // const defaultValues = createRandomShelter(1);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shelter Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {defaultValues && (
            <Image
              src={defaultValues?.profileImage}
              alt={defaultValues?.name || "Shelter image"}
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
                placeholder="Enter shelter name"
                defaultValue={defaultValues?.name}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter shelter email"
                defaultValue={defaultValues?.email}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter phone number"
                defaultValue={defaultValues?.phone}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Enter shelter capacity"
                defaultValue={defaultValues?.capacity}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeFrom">Opening Time</Label>
              <Input
                id="timeFrom"
                defaultValue={defaultValues?.availableTime?.from}
                type="time"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeTo">Closing Time</Label>
              <Input
                id="timeTo"
                defaultValue={defaultValues?.availableTime?.to}
                type="time"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Textarea
              id="location"
              placeholder="Enter shelter location"
              rows={3}
              defaultValue={defaultValues?.location}
            />
          </div>
          {/*
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image URL</Label>
            <Input
              id="profileImage"
              placeholder="Enter profile image URL"
              defaultValue={defaultValues?.profileImage}
            />
          </div> */}

          <Button className="w-full">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
