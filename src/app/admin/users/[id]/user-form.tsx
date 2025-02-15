'use client';

import { useToast } from '@/hooks/use-toast';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateUser } from '@/lib/actions';
import { useEffect } from 'react';
import { User } from '@/types/users';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function UserForm({ user }: { user: User }) {
    const { toast } = useToast();
    const [state, formAction] = useActionState(updateUser, null);

    useEffect(() => {
        if (state?.success) {
            toast({
                title: 'Success',
                description: state.message,
            });
        } else if (state?.success === false) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: state.message,
            });
        }
    }, [state, toast]);

    return (
        <Card className="w-full max-w-md">
            <form action={formAction}>
                <input type="hidden" name="userId" value={user.user_id} />

                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-center">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user.avatar} alt={user.user_name} />
                            <AvatarFallback>{user.user_name[0]}</AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="user-id">User ID</Label>
                            <Input id="user-id" value={user.user_id} readOnly />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" defaultValue={user.user_name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" defaultValue={user.user_email} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" defaultValue={user.user_phone} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" defaultValue={user.location} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end items-end">
                    <SubmitButton />
                </CardFooter>

            </form>
        </Card>

    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    );
}