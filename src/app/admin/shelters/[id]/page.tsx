// src/app/admin/shelters/[id]/page.tsx
import { getShelterByIdFromDB } from '@/lib/database';
import ShelterDetailPage from './ShelterDetailPage';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { origin: string };
}) {
  // Fetch shelter data asynchronously
  const shelter = await getShelterByIdFromDB(parseInt(params.id));

  if (!shelter) {
    return <div>Shelter not found</div>;
  }

  // Pass data to the Client Component
  return (
    <ShelterDetailPage
      shelter={shelter}
      origin={searchParams.origin || 'management'}
    />
  );
}