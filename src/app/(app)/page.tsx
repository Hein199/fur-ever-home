import PetContainer from "@/components/pet-container";
import { Button } from "@/components/ui/button";
import ImpactSection from "@/components/ui/impact";
import { PawPrint } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
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
          <PetContainer page={1} limit={8} />
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
