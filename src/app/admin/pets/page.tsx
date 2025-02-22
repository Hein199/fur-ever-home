"use client"; // Ensure this is a Client Component

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PetTable from "../_components/pet-table";
import AppPagination from "@/components/pagination";
import AdminBreadcrumb from "../_components/admin-breadcrumb";

interface Pet {
  pet_id: string;
  avatar?: string;
  pet_name?: string;
  age?: number;
  gender?: string;
  location?: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10); // Ensure page is an integer

  const [pets, setPets] = useState<Pet[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/pets?page=${page}&limit=10`, { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`Failed to fetch pets: ${response.statusText}`);
        }

        const data = await response.json();
        setPets(data.pets || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [page]);

  return (
    <>
      <AdminBreadcrumb title="Pet Management" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <PetTable pets={pets} loading={loading} />
        <AppPagination page={page} totalPage={totalPages} />
      </div>
    </>
  );
}
