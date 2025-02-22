import { Shelter } from "@/types/shelter";
import { faker } from "@faker-js/faker";
import { query } from "@/lib/database";
const limit = 15;

export const createRandomShelter = (id: number): Shelter => {
  return {
    shelter_id: id,
    shelter_name: faker.person.fullName(),
    shelter_email: faker.internet.email(),
    shelter_phone: faker.phone.number({
      style: "national"
    }),
    avatar: faker.image.urlPicsumPhotos({
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

export const getShelters = async (page: number, limit: number = 10) => {
  const offset = (page - 1) * limit;
  const result = await query(
    "SELECT * FROM shelter WHERE status = 'Approved' ORDER BY shelter_id LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return result.rows;
};

export const getShelterPageCount = async (limit: number = 10) => {
  const result = await query("SELECT COUNT(*) FROM shelter WHERE status = 'Approved'");
  return Math.ceil(Number(result.rows[0].count) / limit);
};