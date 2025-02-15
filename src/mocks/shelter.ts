import { Shelter } from "@/types/shelter";
import { faker } from "@faker-js/faker";

const limit = 15;

export const createRandomShelter = (id: number): Shelter => {
  return {
    id: id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({
      style: "national"
    }),
    profileImage: faker.image.urlPicsumPhotos({
      width: 400,
      height: 400,
      blur: 1,
      grayscale: false
    }),
    location: faker.location.streetAddress(),
    status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
    capacity: faker.number.int({ min: 10, max: 100 }),
    availableTime: {
      from: faker.helpers.arrayElement(['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM']),
      to: faker.helpers.arrayElement(['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'])
    }
  };
};

export const getShelters = (page: number): Shelter[] => {
  const shelters: Shelter[] = [];
  for (let i = 1; i <= limit; i++) {
    shelters.push(createRandomShelter((page - 1) * limit + i));
  }
  return shelters;
}

export const getShelterPageCount = (): number => {
  return 10;
}