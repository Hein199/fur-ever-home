import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminBreadcrumb from "@/app/admin/_components/admin-breadcrumb";
import { ShelterProfileForm } from "./_components/shelter-profile-form";
import { getShelterByIdFromDB } from '@/lib/database';

export default async function ShelterProfilePage() {
  const cookieStore = cookies();
  const sessionId = (await cookieStore).get('sessionId')?.value;
  const userRole = (await cookieStore).get('userRole')?.value;

  if (!sessionId || userRole !== 'shelter') {
    redirect('/login');
  }

  const shelter = await getShelterByIdFromDB(Number(sessionId));

  if (!shelter) {
    redirect('/login');
  }

  return (
    <div>
      <AdminBreadcrumb title="Shelter Profile" />
      <div className="my-8">
        <ShelterProfileForm defaultValues={shelter} />
      </div>
    </div>
  );
}