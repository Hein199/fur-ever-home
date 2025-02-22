export type Shelter = {
  shelter_id: number;
  shelter_name: string;
  shelter_email: string;
  shelter_phone: string;
  avatar: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
  capacity: number;
  availableTime: {
    from: string;
    to: string;
  };
};
