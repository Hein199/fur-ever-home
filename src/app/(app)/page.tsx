"use client";

import PetContainer from "@/components/pet-container";
import { Button } from "@/components/ui/button";
import ImpactSection from "@/components/ui/impact";
import { PawPrint } from "lucide-react";
import Link from "next/link";
import { IKImage } from "imagekitio-next";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LandingPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchPets = async () => {
      try {
        const res = await fetch(`/api/pets?page=1&limit=8`);
        if (!res.ok) throw new Error('Failed to fetch pets');
        const data = await res.json();
        setPets(data.pets);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [user, router]);

  if (!user) return null;

  return (
    <>
      <div className="landing-page bg-gray-100 min-h-[calc(100vh-120px)] py-10 px-8">
        <section className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              Connecting Hearts, One Paw at a Time{" "}
              <PawPrint className="inline-block w-6 h-6 sm:w-10 sm:h-10" />
            </h1>
            <p className="text-lg text-gray-700 mt-2">
              Your one-stop destination to find your new best friend.
            </p>
          </header>
          {loading ? (
            <div className="text-center">Loading pets...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              <PetContainer pets={pets} />
              {pets.length === 0 && (
                <div className="text-center">No pets available</div>
              )}
            </>
          )}
          <div className="flex justify-center mt-4">
            <Button asChild>
              <Link href="/app/pets">Browse Pets</Link>
            </Button>
          </div>
        </section>
      </div>
      <ImpactSection />
    </>
  );
};

export default LandingPage;
