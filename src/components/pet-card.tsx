"use client";

import { Pet } from "@/types/pet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const PetCard = ({ pet }: { pet: Pet }) => {
  const pathname = usePathname();
  const isShelter = pathname.startsWith("/shelter");

  return (
    <div>
      <Link href={isShelter? `/shelter/pets/${pet.id}` : `/app/pets/${pet.id}`}>
        <div className="relative overflow-hidden shadow-lg cursor-pointer">
          <Image
            src={pet.profileImage}
            alt={pet.name}
            width={400}
            height={400}
            className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110 max-h-96 min-h-96"
          />
          <div className="text-center absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
            <h3 className="text-xl font-bold">{pet.name}</h3>
            <p className="text-sm">{pet.age} years old</p>
            {pet.ownership === "shelter" ? (
              <p className="text-sm">Shelter: {pet.shelter?.name}</p>
            ) : (
              <p className="text-sm">Owner: {pet.owner?.name}</p>
            )}
            <p className="text-sm mt-2 line-clamp-2">{pet.description}</p>
            <span className="mt-4 bg-primary text-white px-2 py-1 rounded-full">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PetCard;
