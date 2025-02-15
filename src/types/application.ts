export type Application = {
  id: number;
  name: string;
  age: number;
  occupation: string;
  email: string;
  address: string;
  phone: string;
  reason: string;
  petId: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};