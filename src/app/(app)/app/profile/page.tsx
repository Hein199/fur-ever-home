import ProfileForm from "@/app/admin/_components/profile-form";
import PetContainer from "@/components/pet-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Appointment from "./_components/appointment";
import Applications from "./_components/application";

const ProfileMediaPage = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] py-10 px-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl sm:text-2xl font-bold text-primary mb-4">
          Profile
        </h1>
        <Button asChild>
          <Link href="/login">Log Out</Link>
        </Button>
      </div>
      <Tabs defaultValue="media" className="">
        <TabsList className="mb-4">
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="media">
          <PetContainer page={1} limit={12} />
        </TabsContent>
        <TabsContent value="information">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <ProfileForm />
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
};

export default ProfileMediaPage;
