"use client";

import { Pet } from "@/types/pet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const PetCard = ({ pet }: { pet: Pet }) => {
  const pathname = usePathname();
  const isShelter = pathname.startsWith("/shelter");

  // const petAvatar = pet.avatar || "/default-pet-avatar.png";
  const defaultImage = '/assets/pets/1.jpg'; // Place a mock image in the public/images folder
  const imageUrl = pet.avatar && pet.avatar.startsWith('http')
    ? pet.avatar
    : defaultImage;

  return (
    <div className="w-full">
      <Link href={isShelter ? `/shelter/pets/${pet.pet_id}` : `/app/pets/${pet.pet_id}`}>
        <div className="relative overflow-hidden shadow-lg cursor-pointer">
          <Image
            src={imageUrl}
            alt={pet.pet_name}
            width={400}
            height={400}
            className="w-full h-96 object-cover transition-transform duration-300 transform hover:scale-110"
          />
          <div className="text-center absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4">
            <h3 className="text-xl font-bold">{pet.pet_name}</h3>
            <p className="text-sm">{pet.age} years old</p>
            {pet.shelter?.shelter_name ? (
              <p className="text-sm">Shelter: {pet.shelter.shelter_name}</p>
            ) : pet.owner?.user_name ? (
              <p className="text-sm">Owner: {pet.owner.user_name}</p>
            ) : null}
            <p className="text-sm mt-2 line-clamp-2">{pet.about}</p>
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
