"use client"

import { getPets } from "@/mocks/pet";
import PetCard from "./pet-card";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PetContainer = ({ limit, page }: { limit: number; page: number }) => {
  const pets = getPets(page, limit);
    const pathname = usePathname();
  const isShelter = pathname.startsWith("/shelter");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end items-center">
        <Button asChild>
          <Link href={
            isShelter ? `/shelter/pets/new` : `/app/pets/new`
          }>Add New Pet</Link>
        </Button>
      </div>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5 justify-center">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </section>
    </div>
  );
};

export default PetContainer;
