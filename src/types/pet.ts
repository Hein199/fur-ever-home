import { Shelter } from "./shelter";
import { User } from "./users";

export type Pet = {
  pet_id: number;
  pet_name: string;
  age: string;
  gender: string;
  avatar: string;
  location: string;
  shelter?: Shelter;
  owner?: User;
  ownership?: 'shelter' | 'owner';
  about?: string;
  weight: number;
  color: string;
  size: string;
  status: string;
}