"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import ImageUpload from "@/components/ImageUpload";
import { Pet } from "@/types/pet";

interface PetFormCardProps {
  pet?: Pet;
}

export default function PetFormCard({ pet }: PetFormCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isCreate = !pet;
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

  const [petData, setPetData] = useState<Partial<Pet>>({
    pet_id: pet?.pet_id ?? 0,
    pet_name: pet?.pet_name ?? "",
    size: pet?.size ?? "",
    weight: pet?.weight ?? 0,
    color: pet?.color ?? "",
    status: pet?.status ?? "",
    age: pet?.age ?? "",
    gender: pet?.gender ?? "",
    avatar: pet?.avatar ?? "",
    location: pet?.location ?? "",
    about: pet?.about ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPetData({ ...petData, [e.target.id]: e.target.value });
  };

  const handleImageUpload = (filePath: string) => {
    setPetData({ ...petData, avatar: filePath });
  };

  const handleSave = async () => {
    if (!petData.pet_name) {
      toast({ title: "Error", description: "Pet name is required!" });
      return;
    }

    try {
      const response = await fetch(`/api/pets/${petData.pet_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast({ title: "Success", description: "Pet information updated successfully!" });
      router.refresh();
    } catch (error) {
      console.error("Update Error:", error);
      toast({ title: "Error", description: "Failed to update pet details." });
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${petData.pet_name}?`)) return;

    try {
      const response = await fetch(`/api/pets/${petData.pet_id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast({ title: "Deleted", description: "Pet has been removed from the database." });
      router.push("/admin/pets");
    } catch (error) {
      console.error("Delete Error:", error);
      toast({ title: "Error", description: "Failed to delete pet." });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Pet Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <ImageUpload
            type="image"
            accept="image/*"
            placeholder="Upload a pet image"
            folder="pets"
            variant="light"
            onFileChange={handleImageUpload}
            value={petData.avatar}
          />
        </div>

        {petData.avatar && (
          <div className="flex justify-center">
            <img
              src={`${urlEndpoint}/${petData.avatar}`}
              alt={petData.pet_name || "Pet Image"}
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <div className="space-y-4">
          {petData.pet_id > 0 && (
            <div className="space-y-2">
              <Label htmlFor="pet-id">Pet ID</Label>
              <Input id="pet-id" value={petData.pet_id} readOnly />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="pet_name">Name</Label>
            <Input id="pet_name" value={petData.pet_name} onChange={handleChange} required />
          </div>
          <div className="space-y-4">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" value={petData.weight} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <Label htmlFor="color">Color</Label>
            <Input id="color" value={petData.color} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <Label htmlFor="size">Size</Label>
            <Input id="size" value={petData.size} onChange={handleChange} />
          </div>
          <div className="space-y-4">
            <Label htmlFor="status">Status</Label>
            <Input id="status" value={petData.status} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" value={petData.age} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" value={petData.gender} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Textarea id="location" value={petData.location} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea id="about" value={petData.about} onChange={handleChange} required />
          </div>

        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="default" onClick={handleSave}>Save</Button>
        {!isCreate && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete {petData.pet_name}.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDelete}>Delete</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}