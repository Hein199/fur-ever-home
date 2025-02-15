import { Application } from "@/types/application";
import { faker } from "@faker-js/faker";

export const createRandomApplication = (id: number): Application => {
  return {
    id: id,
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 65 }),
    occupation: faker.person.jobTitle(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    phone: faker.phone.number({
      style: "national",
    }),
    reason: faker.lorem.sentence({
      min: 30,
      max: 80,
    }),
    petId: faker.number.int({ min: 1, max: 100 }),
    status: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
    createdAt: new Date().toISOString(),
  };
};

export const getApplications = (
  page: number,
  limit: number = 10
): Application[] => {
  const applications: Application[] = [];
  for (let i = 1; i <= limit; i++) {
    applications.push(createRandomApplication((page - 1) * limit + i));
  }
  return applications;
};

export const getApplicationPageCount = (): number => {
  return 10;
};
