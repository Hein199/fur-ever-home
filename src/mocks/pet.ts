import { Pet } from "@/types/pet";
import { faker } from "@faker-js/faker";
import { createRandomShelter } from "./shelter";
import { createRandomUser } from "./users";

const defaultLimit = 12;

export const createRandomPet = (id: number): Pet => {
  // const category = faker.helpers.arrayElement(['dog', 'cat', 'rabbit', 'hamster', 'parrot']);
  return {
    id: id,
    name: faker.animal.dog(),
    age: faker.number.int({ min: 1, max: 15 }),
    gender: faker.helpers.arrayElement(['male', 'female']),
    // profileImage: faker.image.urlPicsumPhotos({
    //   width: 400,
    //   height: 400,
    //   blur: 1,
    //   grayscale: false,
    //   // category: category
    // }),
    profileImage: `/assets/pets/${(id % 10)+1}.jpg`,
    location: faker.location.streetAddress(),
    shelter: createRandomShelter(1),
    owner: createRandomUser(1),
    ownership: faker.helpers.arrayElement(['shelter', 'owner']),
    description: faker.lorem.paragraph(),
    weight: faker.number.float({ min: 1, max: 50, fractionDigits: 1 }),
    color: faker.color.human(),
    size: faker.helpers.arrayElement(['small', 'medium', 'large']),
    status: faker.helpers.arrayElement(['available', 'adopted', 'fostered']),
  };
};

export const getPets = (page: number, limit?: number): Pet[] => {
  limit = limit || defaultLimit;
  const pets: Pet[] = [];
  for (let i = 1; i <= limit; i++) {
    pets.push(createRandomPet((page - 1) * limit + i));
  }
  return pets;
}

export const getPetPageCount = (): number => {
  return 10;
}
