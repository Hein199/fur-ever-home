"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImagePicker } from "@/components/ui/image-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Pet } from "@/types/pet";
import Image from "next/image";

interface PetFormCardProps {
  pet?: Pet;
  isEditable?: boolean;
}

export default function PetFormCard({ pet, isEditable }: PetFormCardProps) {
  const isCreate = !pet;

  const { toast } = useToast()

  // const onUpdate = (pet: Pet) => {
  //   console.log("Update", pet);
  // };

  // const onCreate = () => {};

  const onDelete = (pet: Pet) => {
    toast({
      title: "Pet deleted",
      description: `${pet.name} has been removed from the database.`,
    })
    console.log("Delete", pet);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pet Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="h-40 w-40">
            <ImagePicker
              defaultValue={pet?.profileImage}
              onImageChange={(file) => console.log(file)}
              editable={isEditable}
            />
          </div>
        </div>

        <div className="space-y-4">
          {pet?.id && (
            <div className="space-y-2">
              <Label htmlFor="pet-id">Pet ID</Label>
              <Input id="pet-id" value={pet?.id} readOnly />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={pet?.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" defaultValue={pet?.age.toString()} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" defaultValue={pet?.gender} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Textarea
              id="location"
              defaultValue={pet?.location}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="default">Save</Button>
        {!isCreate && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  {pet?.name} from the database.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={() => onDelete?.(pet)}>
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
