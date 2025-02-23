"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createRandomPet } from "@/mocks/pet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const IMAGEKIT_URL = "https://ik.imagekit.io/1cdqvkf2u";
const DEFAULT_IMAGE = "/default-pet-avatar.jpg";

const PetDetailedPage = () => {
  const params = useParams();
  const router = useRouter();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ensure `params.id` is available before parsing
  const petId = params?.id ? parseInt(params.id as string, 10) : null;

  useEffect(() => {
    if (!petId) {
      setError("Invalid pet ID.");
      setLoading(false);
      return;
    }

    const fetchPet = async () => {
      try {
        console.log("Fetching pet details for ID:", petId);

        const res = await fetch(`/api/pets/${petId}`);
        if (!res.ok) throw new Error("Failed to fetch pet details");

        const data = await res.json();
        console.log("Fetched Pet Data:", data);

        setPet(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to fetch pet details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  if (loading) return <div className="text-center">Loading pet details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!pet) return <div className="text-center text-gray-500">Pet not found.</div>;

  return (
    <div className="py-10 px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-[500px] max-w-full h-auto relative overflow-hidden rounded-lg">
          {pet.avatar && pet.avatar !== "undefined" ? (
            <Image
              src={pet.avatar}
              alt={pet.pet_name}
              width={450}
              height={400}
              objectFit="cover"
              className="rounded-lg w-full h-full max-w-[450px] max-h-[400px]"
              unoptimized
            />
          ) : (
            <img
              src={DEFAULT_IMAGE}
              alt="Default pet"
              className="rounded-lg w-full h-full object-cover max-w-[450px] max-h-[400px]"
            />
          )}
        </div>

        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold">{pet.pet_name}</h1>
          <p className="text-gray-600">{pet.age || "Unknown"} old • {pet.gender || "Unknown"}</p>

          <div className="grid grid-cols-2 gap-4 py-4">
            <InfoCard title="Weight" value={pet.weight ? `${pet.weight} kg` : "N/A"} />
            <InfoCard title="Color" value={pet.color || "N/A"} />
            <InfoCard title="Size" value={pet.size || "N/A"} />
            <InfoCard title="Status" value={pet.status || "N/A"} />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="text-gray-600 leading-relaxed">{pet.about || "No description available."}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shelter Information</h2>
            <Link href={`/app/shelters/${pet.shelter_id}`}>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`${IMAGEKIT_URL}${pet.shelter_avatar}`} /> {/* ✅ Use ImageKit for shelter avatar */}
                  <AvatarFallback>{pet.shelter_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{pet.shelter_name || "Unknown Shelter"}</h3>
                  <p className="text-sm text-gray-600">{pet.location || "N/A"}</p>
                </div>
              </div>
            </Link>
          </div>

          <Button className="w-full">Adopt {pet.pet_name}</Button>
        </div>
      </div>
    </div>
  );
};

export default PetDetailedPage;

const InfoCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="text-sm text-gray-600">{title}</div>
    <div className="font-medium">{value}</div>
  </div>
);
