import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createRandomPet } from "@/mocks/pet";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
import { Pet } from "@/types/pet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const PetDetailedPage = async (props: any) => {
  const params = await props.params;
  const id = parseInt(params.id);
  const pet = createRandomPet(id);
  return (
    <div className="py-10 px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="mb-10">
          <Image
            src={pet.profileImage}
            alt={pet.name}
            className="rounded-lg w-full h-full object-cover min-w-full sm:min-w-[300px] min-h-[500px]"
            width={300}
            height={300}
          />
        </div>
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{pet.name}</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <span>{pet.age} years old</span>
              <span>•</span>
              <span>{pet.gender}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <InfoCard title="Weight" value={`${pet.weight} kg`} />
            <InfoCard title="Color" value={pet.color} />
            <InfoCard title="Size" value={pet.size} />
            <InfoCard title="Status" value={pet.status} />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="text-gray-600 leading-relaxed">{pet.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shelter Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <Link href={`/app/shelters/${pet.shelter?.id}`}>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={pet.shelter?.profileImage} />
                    <AvatarFallback>{pet.shelter?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{pet.shelter?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {pet.shelter?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <ReportDialog pet={pet} />
            </div>
          </div>

          <div className="pt-6">
            <ApplicationDialog pet={pet} />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="text-sm text-gray-600">{title}</div>
    <div className="font-medium">{value}</div>
  </div>
);

const ApplicationDialog = async ({ pet }: { pet: Pet }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Adopt {pet.name}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adoption Application for {pet.name}</DialogTitle>
          <DialogDescription>
            Please fill out all required information for your adoption
            application.
          </DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" required placeholder="Enter your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              type="number"
              id="age"
              required
              min="18"
              placeholder="Your age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation *</Label>
            <Input
              id="occupation"
              required
              placeholder="Your current occupation"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              type="email"
              id="email"
              required
              placeholder="your.email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              type="tel"
              id="phone"
              required
              placeholder="Your phone number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Home Address *</Label>
            <Input id="address" required placeholder="Your full address" />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="reason">
              Why do you want to adopt {pet.name}? *
            </Label>
            <Textarea
              id="reason"
              required
              placeholder="Please tell us why you would be a great home for this pet..."
              className="min-h-[120px]"
            />
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit">Submit Application</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ReportDialog = async ({ pet }: { pet: Pet }) => {
  const reportReasons = [
    "Fraudulent listing",
    "Inappropriate content",
    "Incorrect information",
    "Animal abuse/neglect",
    "Other",
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size="icon">
          <Flag className="w-6 h-6 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report {pet?.shelter?.name}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>Please select a reason for reporting {pet?.shelter?.name}:</p>
          <RadioGroup className="mt-4 space-y-2">
            {reportReasons.map((reason) => (
              <div key={reason} className="flex items-center space-x-2">
                <RadioGroupItem value={reason} id={reason} />
                <Label htmlFor={reason}>{reason}</Label>
              </div>
            ))}
          </RadioGroup>
          <textarea
            className="w-full h-24 mt-4 p-2 border border-gray-300 rounded-md"
            placeholder="Additional details (optional)"
          ></textarea>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button>Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PetDetailedPage;
