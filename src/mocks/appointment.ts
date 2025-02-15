import { Appointment } from "@/types/appointment";
import { faker } from "@faker-js/faker";
import { createRandomShelter } from "./shelter";

const limit = 10;

export const createRandomAppointment = (id: number): Appointment => {
  return {
    id: id,
    date: faker.date.future().toISOString(),
    time: faker.date.future().toLocaleTimeString(),
    shelterId: faker.number.int({ min: 1, max: 100 }),
    userId: faker.number.int({ min: 1, max: 100 }),
    createdAt: faker.date.recent().toISOString(),
    shelter: createRandomShelter(1),
    user: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
    status: faker.helpers.arrayElement(["pending", "approved", "rejected"]),
  };
};

export const getAppointments = (page: number): Appointment[] => {
  const appointments: Appointment[] = [];
  for (let i = 1; i <= limit; i++) {
    appointments.push(createRandomAppointment((page - 1) * limit + i));
  }
  return appointments;
};

export const getAppointmentPageCount = (): number => {
  return 8;
};
