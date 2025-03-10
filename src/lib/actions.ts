'use server';

import { query, updateShelterInDB, userUpdateUserInDB } from './database';
import { updateUserInDB, deleteUserFromDB } from './database';
import { updatePetInDB, deletePetFromDB } from './database';
import { updateAdminInDB } from './database';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};
//User
export async function updateUser(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const userId = Number(formData.get('userId'));
  const userData = {
    user_name: formData.get('name') as string,
    user_email: formData.get('email') as string,
    user_phone: formData.get('phone') as string,
    location: formData.get('location') as string,
    avatar: formData.get('avatar') as string || undefined
  };

  try {
    await updateUserInDB(userId, userData);
    revalidatePath(`/admin/users/${userId}`);

    return {
      success: true,
      message: 'User information updated successfully'
    };
  } catch (error) {
    console.error('Update failed:', error);
    return {
      success: false,
      message: 'Failed to update user information. Please try again.'
    };
  }
}

// src/lib/actions.ts
export async function userUpdateUser(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const userId = Number(formData.get('userId'));
  const userData = {
    user_name: formData.get('name') as string,
    user_email: formData.get('email') as string,
    user_phone: formData.get('phone') as string,
    location: formData.get('location') as string,
    avatar: formData.get('avatar') as string || undefined
  };

  try {
    await userUpdateUserInDB(userId, userData);
    revalidatePath(`/app/profile`);

    return {
      success: true,
      message: 'Profile updated successfully'
    };
  } catch (error) {
    console.error('Update failed:', error);
    return {
      success: false,
      message: 'Failed to update profile. Please try again.'
    };
  }
}

export async function deleteUser(formData: FormData): Promise<void> {
  const userId = Number(formData.get('userId'));

  try {
    await deleteUserFromDB(userId);
    revalidatePath('/admin/users');
  } catch (error) {
    console.error('Delete failed:', error);
    throw new Error('Failed to delete user');
  }
  redirect('/admin/users');
}
//Shelter
export async function updateShelter(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const shelterId = Number(formData.get('shelterId'));
  const shelterData = {
    shelter_name: formData.get('name') as string,
    shelter_email: formData.get('email') as string,
    shelter_phone: formData.get('phone') as string,
    capacity: Number(formData.get('capacity')),
    opening_time: formData.get('available-from') as string,
    closing_time: formData.get('available-to') as string,
  };

  try {
    await query(
      `UPDATE shelter 
         SET shelter_name = $1, 
             shelter_email = $2, 
             shelter_phone = $3, 
             capacity = $4, 
             opening_time = $5, 
             closing_time = $6 
         WHERE shelter_id = $7`,
      [
        shelterData.shelter_name,
        shelterData.shelter_email,
        shelterData.shelter_phone,
        shelterData.capacity,
        shelterData.opening_time,
        shelterData.closing_time,
        shelterId,
      ]
    );

    // Revalidate the cache for the shelter detail page
    revalidatePath(`/admin/shelters/${shelterId}`);

    return {
      success: true,
      message: 'Shelter information updated successfully',
    };
  } catch (error) {
    console.error('Update failed:', error);
    return {
      success: false,
      message: 'Failed to update shelter information. Please try again.',
    };
  }
}

export async function updateShelterProfile(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const shelterId = Number(formData.get('shelterId'));
  const shelterData = {
    shelter_name: formData.get('name') as string,
    shelter_email: formData.get('email') as string,
    shelter_phone: formData.get('phone') as string,
    location: formData.get('location') as string,
    capacity: Number(formData.get('capacity')),
    opening_time: formData.get('timeFrom') as string,
    closing_time: formData.get('timeTo') as string,
    avatar: formData.get('avatar') as string || undefined
  };

  try {
    await updateShelterInDB(shelterId, shelterData);
    revalidatePath('/shelter/profile');
    return {
      success: true,
      message: 'Shelter information updated successfully'
    };
  } catch (error) {
    console.error('Update failed:', error);
    return {
      success: false,
      message: 'Failed to update shelter information. Please try again.'
    };
  }
}

export async function deleteShelter(formData: FormData): Promise<void> {
  const shelterId = Number(formData.get('shelterId'));

  try {
    await query('DELETE FROM shelter WHERE shelter_id = $1', [shelterId]);

    // Revalidate the cache for the shelters page
    revalidatePath('/admin/shelters');

    // Redirect to the shelters page after deletion
    redirect('/admin/shelters');
  } catch (error) {
    console.error('Delete failed:', error);
    throw new Error('Failed to delete shelter. Please try again.');
  }
}

export async function updatePet(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const petId = Number(formData.get('petId'));
  const petData = {
    pet_name: formData.get('name') as string,
    age: formData.get('age') as string,
    gender: formData.get('gender') as string,
    location: formData.get('location') as string,
    avatar: formData.get('avatar') as string || undefined
  };

  try {
    await updatePetInDB(petId, petData);
    revalidatePath(`/admin/pets/${petId}`);

    return {
      success: true,
      message: 'Pet information updated successfully'
    };
  } catch (error) {
    console.error('Update failed:', error);
    return {
      success: false,
      message: 'Failed to update pet information. Please try again.'
    };
  }
}

export async function deletePet(formData: FormData): Promise<void> {
  const petId = Number(formData.get('petId'));

  try {
    await deletePetFromDB(petId);
    revalidatePath('/admin/pets');
  } catch (error) {
    console.error('Delete failed:', error);
    throw new Error('Failed to delete pet');
  }
  redirect('/admin/pets');
}
//Shelter_register
export async function approveShelter(shelterId: number): Promise<void> {
  try {
    await query(
      `UPDATE shelter SET status = 'Approved' WHERE shelter_id = $1`,
      [shelterId]
    );
    revalidatePath('/admin/shelters-registration');
  } catch (error) {
    console.error('Error approving shelter:', error);
    throw new Error('Failed to approve shelter');
  }
}

// Action to reject a shelter
export async function rejectShelter(shelterId: number): Promise<void> {
  try {
    await query(
      `UPDATE shelter SET status = 'Rejected' WHERE shelter_id = $1`,
      [shelterId]
    );
    revalidatePath('/admin/shelters-registration');
  } catch (error) {
    console.error('Error rejecting shelter:', error);
    throw new Error('Failed to reject shelter');
  }
}

export async function updateAdmin(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const { get } = await cookies();
  const sessionId = get('sessionId')?.value;
  const userRole = get('userRole')?.value;

  if (!sessionId || userRole !== 'admin') {
    return {
      success: false,
      message: 'Not authenticated as admin'
    };
  }

  const adminId = parseInt(sessionId, 10);
  if (isNaN(adminId)) {
    return {
      success: false,
      message: 'Invalid admin ID'
    };
  }

  const adminData = {
    admin_name: formData.get('name') as string,
    admin_email: formData.get('email') as string,
    admin_phone: formData.get('phone') as string,
  };

  try {
    await updateAdminInDB(adminId, adminData);
    revalidatePath('/admin/profile');
    return {
      success: true,
      message: 'Admin information updated successfully'
    };
  } catch (error) {
    console.error('Update failed:', error);
    return {
      success: false,
      message: 'Failed to update admin information. Please try again.'
    };
  }
}