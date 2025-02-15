import PetFormCard from "@/app/admin/pets/_components/pet-form-card";
import { createRandomPet } from "@/mocks/pet";

const PetRegisterPage = () => {
  const pet = createRandomPet(1)
  return (
    <div>

      <div className="my-8 flex flex-col justify-center items-center">
        <h1 className="text-lg text-primary mb-4">Register a new pet</h1>
        <PetFormCard pet={pet} />
      </div>
    </div>
  );
};

export default PetRegisterPage;
