import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminBreadcrumb from "../_components/admin-breadcrumb";
import ProfileForm from "../_components/profile-form";
import { getAdminByIdFromDB } from '@/lib/database';

export default async function Page() {
  const cookieStore = cookies();
  const sessionId = (await cookieStore).get('sessionId')?.value;
  const userRole = (await cookieStore).get('userRole')?.value;

  if (!sessionId || userRole !== 'admin') {
    redirect('/login');
  }

  const adminId = parseInt(sessionId, 10);
  const admin = await getAdminByIdFromDB(adminId);

  if (!admin) {
    redirect('/login');
  }

  return (
    <>
      <AdminBreadcrumb title="Profile" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ProfileForm admin={admin} />
      </div>
    </>
  );
}