"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const IMAGEKIT_URL = "https://ik.imagekit.io/1cdqvkf2u";
const DEFAULT_IMAGE = "/default-pet-avatar.jpg";

const PetDetailedPage = () => {
  const params = useParams();
  const router = useRouter();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ensure `params.id` is available before parsing
  const petId = params?.id ? parseInt(params.id as string, 10) : null;

  useEffect(() => {
    if (!petId) {
      setError("Invalid pet ID.");
      setLoading(false);
      return;
    }

    const fetchPet = async () => {
      try {
        console.log("Fetching pet details for ID:", petId);

        const res = await fetch(`/api/pets/${petId}`);
        if (!res.ok) throw new Error("Failed to fetch pet details");

        const data = await res.json();
        console.log("Fetched Pet Data:", data);

        setPet(data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to fetch pet details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  if (loading) return <div className="text-center">Loading pet details...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!pet) return <div className="text-center text-gray-500">Pet not found.</div>;

  return (
    <div className="py-10 px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="mb-10 w-full sm:w-[400px] h-[500px] relative">
          {pet.avatar && pet.avatar !== "undefined" ? (
            <Image
              src={pet.avatar}
              alt={pet.pet_name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              quality={80}
              unoptimized
            />
          ) : (
            <img
              src={DEFAULT_IMAGE}
              alt="Default pet"
              className="rounded-lg w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-bold">{pet.pet_name}</h1>
          <p className="text-gray-600">{pet.age || "Unknown"} old • {pet.gender || "Unknown"}</p>

          <div className="grid grid-cols-2 gap-4 py-4">
            <InfoCard title="Weight" value={pet.weight ? `${pet.weight} kg` : "N/A"} />
            <InfoCard title="Color" value={pet.color || "N/A"} />
            <InfoCard title="Size" value={pet.size || "N/A"} />
            <InfoCard title="Status" value={pet.status || "N/A"} />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="text-gray-600 leading-relaxed">{pet.about || "No description available."}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shelter Information</h2>
            <Link href={`/app/shelters/${pet.shelter_id}`}>
              <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`${IMAGEKIT_URL}${pet.shelter_avatar}`} />
                  <AvatarFallback>{pet.shelter_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{pet.shelter_name || "Unknown Shelter"}</h3>
                  <p className="text-sm text-gray-600">{pet.location || "N/A"}</p>
                </div>
              </div>
            </Link>
          </div>

          <ApplicationDialog pet={pet} />
        </div>
      </div>
    </div>
  );
};

export default PetDetailedPage;

const InfoCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="text-sm text-gray-600">{title}</div>
    <div className="font-medium">{value}</div>
  </div>
);

const ApplicationDialog = ({ pet }: { pet: any }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    occupation: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false); // ✅ Control modal state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (errors[e.target.id]) {
      setErrors({ ...errors, [e.target.id]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = "This field is required.";
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setErrorMsg("");

    try {
      // Simulating API call (Replace with actual API request)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSubmitted(false);
        setOpen(false); // ✅ Close the modal after success
      }, 2000);
    } catch (err) {
      setErrorMsg("Failed to submit application. Please try again.");
      setSubmitted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Adopt {pet.pet_name}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adoption Application for {pet.pet_name}</DialogTitle>
          <DialogDescription>
            Please complete this form to apply for adopting {pet.pet_name}. Required fields are marked with *.
          </DialogDescription>
        </DialogHeader>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4" onSubmit={handleSubmit}>
          <LabelInput id="name" label="Full Name *" value={formData.name} onChange={handleChange} error={errors.name} />
          <LabelInput id="age" label="Age *" type="number" value={formData.age} onChange={handleChange} error={errors.age} />
          <LabelInput id="occupation" label="Occupation *" value={formData.occupation} onChange={handleChange} error={errors.occupation} />
          <LabelInput id="email" label="Email *" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
          <LabelInput id="phone" label="Phone *" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} />
          <LabelInput id="address" label="Home Address *" value={formData.address} onChange={handleChange} error={errors.address} />
          <div className="col-span-2">
            <Label htmlFor="reason">Why do you want to adopt {pet.pet_name}? *</Label>
            <Textarea id="reason" required value={formData.reason} onChange={handleChange} className={`min-h-[120px] ${errors.reason ? "border-red-500" : ""}`} />
            {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
          </div>

          {errorMsg && <p className="col-span-2 text-red-500 text-sm">{errorMsg}</p>}
          {success && <p className="col-span-2 text-green-500 text-sm">Application submitted successfully! 🎉</p>}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" disabled={submitted}>Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} disabled={submitted}>
            {submitted ? "Submitting..." : "Submit Application"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const LabelInput = ({ id, label, type = "text", value, onChange, error }: any) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} value={value} onChange={onChange} className={`${error ? "border-red-500" : ""}`} />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

