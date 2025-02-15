export type Report = {
  id: number;
  name: string;
  reporterId: number;
  reporterName: string;
  reason: string;
  descirption: string;
  createdAt: string;
  status: "pending" | "resolved";
};