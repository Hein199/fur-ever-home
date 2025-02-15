"use client";

import { getPets } from "@/mocks/pet";
import PetCard from "./pet-card";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shelter } from "@/types/shelter";
import { User } from "@/types/users";
import { Pet } from "@/types/pet";

const PetContainer = ({ limit, page }: { limit: number; page: number }) => {
  const petData = getPets(page, limit);
  console.log(petData);
  const mockShelters: Shelter[] = [
    {
      id: 1,
      name: "Happy Paws Shelter",
      email: "contact@happypaws.org",
      phone: "123-456-7890",
      profileImage: "https://example.com/happypaws.jpg",
      location: "New York, NY",
      status: "approved",
      capacity: 50,
      availableTime: {
        from: "09:00 AM",
        to: "06:00 PM",
      },
    },
  ];

  const mockUsers: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "987-654-3210",
      profileImage: "https://example.com/johndoe.jpg",
    },
  ];
  const pets: Pet[] = [
    {
      id: 1,
      name: "Buddy",
      age: 3,
      gender: "Male",
      profileImage: "/assets/pets/1.jpg",
      location: "Los Angeles, CA",
      shelter: mockShelters[0],
      ownership: "shelter",
      description: "A friendly golden retriever who loves to play.",
      weight: 30,
      color: "Golden",
      size: "Medium",
      status: "Available",
    },
    {
      id: 2,
      name: "Whiskers",
      age: 2,
      gender: "Female",
      profileImage: "/assets/pets/2.jpg",
      location: "San Francisco, CA",
      owner: mockUsers[0],
      ownership: "owner",
      description: "A calm and affectionate cat with a beautiful coat.",
      weight: 4,
      color: "Gray",
      size: "Small",
      status: "Adopted",
    },
    {
      id: 3,
      name: "Max",
      age: 4,
      gender: "Male",
      profileImage: "/assets/pets/3.jpg",
      location: "Chicago, IL",
      shelter: mockShelters[0],
      ownership: "shelter",
      description: "Energetic and loyal German Shepherd.",
      weight: 40,
      color: "Black & Tan",
      size: "Large",
      status: "Available",
    },
    {
      id: 4,
      name: "Luna",
      age: 1,
      gender: "Female",
      profileImage: "/assets/pets/4.jpg",
      location: "Miami, FL",
      owner: mockUsers[0],
      ownership: "owner",
      description: "A playful kitten who loves to chase toys.",
      weight: 3,
      color: "White & Black",
      size: "Small",
      status: "Adopted",
    },
    {
      id: 5,
      name: "Buddy",
      age: 3,
      gender: "Male",
      profileImage: "/assets/pets/1.jpg",
      location: "Los Angeles, CA",
      shelter: mockShelters[0],
      ownership: "shelter",
      description: "A friendly golden retriever who loves to play.",
      weight: 30,
      color: "Golden",
      size: "Medium",
      status: "Available",
    },
    {
      id: 6,
      name: "Whiskers",
      age: 2,
      gender: "Female",
      profileImage: "/assets/pets/2.jpg",
      location: "San Francisco, CA",
      owner: mockUsers[0],
      ownership: "owner",
      description: "A calm and affectionate cat with a beautiful coat.",
      weight: 4,
      color: "Gray",
      size: "Small",
      status: "Adopted",
    },
    {
      id: 7,
      name: "Max",
      age: 4,
      gender: "Male",
      profileImage: "/assets/pets/3.jpg",
      location: "Chicago, IL",
      shelter: mockShelters[0],
      ownership: "shelter",
      description: "Energetic and loyal German Shepherd.",
      weight: 40,
      color: "Black & Tan",
      size: "Large",
      status: "Available",
    },
    {
      id: 8,
      name: "Luna",
      age: 1,
      gender: "Female",
      profileImage: "/assets/pets/4.jpg",
      location: "Miami, FL",
      owner: mockUsers[0],
      ownership: "owner",
      description: "A playful kitten who loves to chase toys.",
      weight: 3,
      color: "White & Black",
      size: "Small",
      status: "Adopted",
    },
  ];
  const pathname = usePathname();
  const isShelter = pathname.startsWith("/shelter");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end items-center">
        <Button asChild>
          <Link href={isShelter ? `/shelter/pets/new` : `/app/pets/new`}>
            Add New Pet
          </Link>
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
