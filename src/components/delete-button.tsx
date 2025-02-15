'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { deleteUser } from '@/lib/actions';

export function DeleteButton({ userId }: { userId: number }) {
    const { toast } = useToast();
    const { pending } = useFormStatus();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            await deleteUser(formData);
        } catch (error) {
            if (error instanceof Error && error.message === 'Failed to delete user') {
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: error.message,
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="userId" value={userId} />
            <Button
                variant="destructive"
                size="icon"
                type="submit"
                disabled={pending}
            >
                <Trash className="w-6 h-6" />
            </Button>
        </form>
    );
}