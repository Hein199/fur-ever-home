import { Suspense } from 'react';
import ProfileContent from './profile-content';
import Loading from '@/components/loading'; // Create a loading component

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent />
    </Suspense>
  );
}