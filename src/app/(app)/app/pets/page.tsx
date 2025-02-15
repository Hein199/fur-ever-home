import Pagination from "@/components/pagination";
import PetContainer from "@/components/pet-container";
import { getPetPageCount } from "@/mocks/pet";
import { PawPrint } from "lucide-react";

const PetList = async (props: { searchParams: Promise<any> }) => {
  const { page } = (await props.searchParams);
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = getPetPageCount();

  return (
    <div className="landing-page bg-gray-100 min-h-[calc(100vh-120px)] py-10 px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            Browsing Pets
            <PawPrint className="inline-block w-6 h-6 sm:w-10 sm:h-10" />
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Your one-stop destination to find your new best friend.
          </p>
        </header>
        <PetContainer page={pageInt} limit={12} />
        <div className="mt-8">
          <Pagination page={pageInt} totalPage={pageCount} />
        </div>
      </div>
    </div>
  );
};

export default PetList;
