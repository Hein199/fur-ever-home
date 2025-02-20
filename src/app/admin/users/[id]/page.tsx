// src/app/admin/users/[id]/page.tsx
import { UserForm } from './user-form';
import { getUserByIdFromDB } from '@/lib/database';
import AdminBreadcrumb from '../../_components/admin-breadcrumb';
import { notFound } from 'next/navigation';

export default async function UserDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = Number(id);
  if (isNaN(userId)) notFound();

  const user = await getUserByIdFromDB(userId);
  if (!user) notFound();

  return (
    <>
      <AdminBreadcrumb
        items={[
          { label: "User Management", href: "/admin/users" },
          { label: `User Details #${user.user_id}` },
        ]}
      />
      <div className="flex flex-1 flex-col items-center gap-4 p-4 mx-auto w-full max-w-7xl">
        <UserForm user={user} />
      </div>
    </>
  );
}