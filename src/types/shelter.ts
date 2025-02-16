export type Shelter = {
  id: number;
  shelter_name: string;
  email: string;
  phone: string;
  profileImage: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  capacity: number;
  availableTime: {
    from: string;
    to: string;
  };
};
