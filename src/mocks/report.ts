import { Report } from "@/types/report";
import { faker } from "@faker-js/faker";

const limit = 15;

export const createRandomReport = (id: number): Report => {
  return {
    id: id,
    name: faker.lorem.words(3),
    reporterId: faker.number.int({ min: 1, max: 100 }),
    reporterName: faker.person.fullName(),
    reason: faker.helpers.arrayElement([
      'Inappropriate content',
      'Spam',
      'Harassment',
      'False information',
      'Other'
    ]),
    descirption: faker.lorem.paragraph(),
    createdAt: faker.date.recent().toISOString(),
    status: faker.helpers.arrayElement(["pending", "resolved"]),
  };
};

export const getReports = (page: number): Report[] => {
  const reports: Report[] = [];
  for (let i = 1; i <= limit; i++) {
    reports.push(createRandomReport((page - 1) * limit + i));
  }
  return reports;
};

export const getReportPageCount = (): number => {
  return 10;
};