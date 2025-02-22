'use server';

import { query } from './database';
import { updateUserInDB, deleteUserFromDB } from './database';
import { updatePetInDB, deletePetFromDB } from './database';
import { revalidatePath } from 'next/cache';
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