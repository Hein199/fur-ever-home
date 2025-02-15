import PetContainer from "@/components/pet-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createRandomShelter } from "@/mocks/shelter";
import AnalysisTab from "./_components/analysis-tab";
import { AppointmentScheduler } from "./_components/appointment";

const ProfileMediaPage = async (props: any) => {
  const params = await props.params;
  const shelter = createRandomShelter(params.id);
  return (
    <div className="min-h-[calc(100vh-120px)] py-10 px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-2xl font-bold text-primary mb-4">
        {shelter.name}
      </h1>
      <Tabs defaultValue="media" className="">
        <TabsList className="mb-4">
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="contact">Appointment</TabsTrigger>
        </TabsList>
        <TabsContent value="media">
          <PetContainer page={1} limit={12} />
        </TabsContent>
        <TabsContent value="information">
          <AnalysisTab shelter={shelter} />
        </TabsContent>
        <TabsContent value="contact">
          <AppointmentScheduler />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileMediaPage;
