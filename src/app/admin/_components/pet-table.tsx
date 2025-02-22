"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SquarePen, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Pet } from "@/types/pet";

export default function PetTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1"; 
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/pets?page=${page}&limit=10`);
        if (!response.ok) {
          throw new Error(`Failed to fetch pets: ${response.statusText}`);
        }
        const data = await response.json();
        setPets(data.pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
        toast({ title: "Error", description: "Failed to fetch pet data." });
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;

    try {
      const response = await fetch(`/api/pets/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete pet");
      }

      toast({ title: "Deleted", description: "Pet has been removed successfully." });
      setPets((prevPets) => prevPets.filter((pet) => pet.pet_id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
      toast({ title: "Error", description: "Failed to delete pet." });
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Pet Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center">
                Loading pets...
              </TableCell>
            </TableRow>
          ) : pets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center">
                No pets found.
              </TableCell>
            </TableRow>
          ) : (
            pets.map((pet) => (
              <TableRow key={pet.pet_id}>
                <TableCell>{pet.pet_id}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={pet.avatar || "/default-pet.png"} alt={pet.pet_name} />
                    <AvatarFallback>{pet.pet_name?.[0] || "P"}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Link href={`/admin/pets/${pet.pet_id}`} className="text-primary underline">
                    {pet.pet_name}
                  </Link>
                </TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.gender}</TableCell>
                <TableCell>{pet.location}</TableCell>
                <TableCell>{pet.weight} kg</TableCell>
                <TableCell>{pet.color}</TableCell>
                <TableCell>{pet.size}</TableCell>
                <TableCell>{pet.status}</TableCell>
                <TableCell>{pet.about}</TableCell>
                <TableCell className="flex gap-2 items-center justify-center">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/pets/${pet.pet_id}`}>
                      <SquarePen className="w-6 h-6" />
                    </Link>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(pet.pet_id)}>
                    <Trash className="w-6 h-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
