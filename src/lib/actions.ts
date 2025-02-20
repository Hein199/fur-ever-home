'use server';

import { updateUserInDB, deleteUserFromDB } from './database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type FormState = {
    success?: boolean;
    message?: string;
    errors?: Record<string, string>;
};

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