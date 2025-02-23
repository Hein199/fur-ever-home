"use client";

// import { getPets } from "@/mocks/pet";
import PetCard from "./pet-card";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shelter } from "@/types/shelter";
import { User } from "@/types/users";
import { Pet } from "@/types/pet";
import { useEffect, useState } from "react";

const PetContainer = ({ userId }: { userId?: number }) => {
  const pathname = usePathname();
  const isShelter = pathname.startsWith("/shelter");
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const url = userId
          ? `/api/pets?userId=${userId}`
          : '/api/pets';
        const response = await fetch(url);
        const data = await response.json();
        setPets(data.pets);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [userId]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end items-center">
        <Button asChild>
          <Link href={isShelter ? "/shelter/pets/new" : "/app/pets/new"}>
            Add New Pet
          </Link>
        </Button>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 justify-center">
        {pets?.map((pet) => (
          <PetCard key={pet.pet_id} pet={pet} />
        ))}
      </section>
    </div>
  );
};

export default PetContainer;
