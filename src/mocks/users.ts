import { User } from "@/types/users";
import { faker } from "@faker-js/faker";

const limit = 15;

export const createRandomUser = (id:number): User => {
  return {
    id: id,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({
      style: "national"
    }),
    profileImage: faker.image.avatar()
  };
};

export const getUsers = (page: number): User[] => {
  const users: User[] = [];
  for (let i = 1; i <= limit; i++) {
    users.push(createRandomUser((page - 1) * limit + i));
  }
  return users;
}

export const getUserPageCount = (): number => {

  return 10
}