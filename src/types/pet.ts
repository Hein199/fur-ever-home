import { Shelter } from "./shelter";
import { User } from "./users";

export type Pet = {
  id: number;
  name: string;
  age: number;
  gender: string;
  profileImage: string;
  location: string;
  shelter?: Shelter;
  owner?: User;
  ownership?: 'shelter' | 'owner';
  description?: string;
  weight: number;
  color: string;
  size: string;
  status: string;
}