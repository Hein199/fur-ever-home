export type Appointment = {
  id: number;
  date: string;
  time: string;
  shelterId: number;
  userId: number;
  createdAt: string;
  shelter: {
    id: number;
    name: string;
    location: string;
  };
  user: {
    name: string;
    email: string;
  }
  status: string;
}