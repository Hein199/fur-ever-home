"use client";
import { useActionState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { updateUser } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UserProfileForm() {
    const [state, formAction] = useActionState(updateUser, null);
    const { toast } = useToast();
    const router = useRouter();
    const { user, logout } = useAuth();

    useEffect(() => {
        if (state?.success) {
            toast({
                title: "Success",
                description: state.message,
            });
            router.refresh();
        } else if (state?.success === false) {
            toast({
                title: "Error",
                description: state.message,
                variant: "destructive",
            });
        }
    }, [state, toast, router]);

    if (!user) return null;

    return (
        <Card className="max-w-xs mx-auto w-full">
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={formAction} className="space-y-6">
                    <input type="hidden" name="userId" value={user.id} />
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                defaultValue={user.name}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                defaultValue={user.email}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                defaultValue={user.phone}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="Enter your location"
                                defaultValue={user.location}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="avatar">Avatar URL</Label>
                            <Input
                                id="avatar"
                                name="avatar"
                                placeholder="Paste avatar image URL"
                                defaultValue={user.avatar}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Save Changes
                        </Button>
                        <Button
                            type="button"
                            onClick={() => logout()}
                            className="w-full mt-4"
                            variant="destructive"
                        >
                            Logout
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}