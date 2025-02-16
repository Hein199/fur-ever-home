import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import Pagination from "@/components/pagination";
import PetContainer from "@/components/pet-container";
import { Button } from "@/components/ui/button";
import { getPetPageCount } from "@/mocks/pet";
import { PawPrint } from "lucide-react";
import Link from "next/link";

const PetList = async (props: { searchParams: Promise<any> }) => {
  const { page } = await props.searchParams;
  const pageInt = page ? parseInt(page) : 1;
  // const pageCount = getPetPageCount();

  // Fetch pets from the API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/pets?page=${pageInt}&limit=12`
  );
  const data = await response.json();

  const pets = data.pets;
  const pageCount = data.totalPages;

  return (
    <div>
      <AdminBreadcrumb title="Media" />
      <div className="bg-gray-100 min-h-[calc(100vh-120px)] py-10 px-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between gap-4 w-full mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              My Shelter
              <PawPrint className="inline-block w-6 h-6 sm:w-10 sm:h-10" />
            </h1>
            {/* <Button asChild>
              <Link href="/shelter/pets/new">Add New Pet</Link>
            </Button> */}
          </header>
          <PetContainer pets={pets} />
          <div className="mt-8">
            <Pagination page={pageInt} totalPage={pageCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetList;
