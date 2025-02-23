"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PetContainer from "@/components/pet-container";
import UserProfileForm from "./_components/user-profile-form";
import Appointment from "./_components/appointment";
import Applications from "./_components/application";
import { useAuth } from '@/context/auth-context';

export default function ProfileContent() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <div className="min-h-[calc(100vh-120px)] py-10 px-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl sm:text-2xl font-bold text-primary mb-4">
                    {user.name}'s Profile
                </h1>
            </div>
            <Tabs defaultValue="media">
                <TabsList className="mb-4">
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="information">Information</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                    <TabsTrigger value="applications">Applications</TabsTrigger>
                </TabsList>
                <TabsContent value="media">
                    <PetContainer userId={user.id} />
                </TabsContent>
                <TabsContent value="information">
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        <UserProfileForm />
                    </div>
                </TabsContent>
                <TabsContent value="appointments">
                    <Appointment />
                </TabsContent>
                <TabsContent value="applications">
                    <Applications />
                </TabsContent>
            </Tabs>
        </div>
    );
}