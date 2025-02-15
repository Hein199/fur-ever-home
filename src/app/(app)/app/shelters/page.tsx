
import React from "react";
import { getShelterPageCount } from "@/mocks/shelter";
import Pagination from "@/components/pagination";
import ShelterContainer from "@/components/shelter-container";

export default async function ShelterList(props: { searchParams: Promise<any> }) {
  const { page } = (await props.searchParams);
  const pageInt = page ? parseInt(page) : 1;
  const pageCount = getShelterPageCount();

  return (
    <div className="min-h-[calc(100vh-120px)] py-10 px-8">
      <section className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            Browsing Shelters
          </h1>
          <p className="text-lg text-gray-700 mt-2">
            Find the best shelters for your pets.
          </p>
        </header>
        <ShelterContainer page={pageInt} limit={12} />
        <div className="mt-8">
          <Pagination page={pageInt} totalPage={pageCount} />
        </div>
      </section>

    </div>
  );
}