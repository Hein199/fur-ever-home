import { Card, CardContent } from "@/components/ui/card";
import { Shelter } from "@/types/shelter";
import Image from "next/image";

export default function AnalysisTab({ shelter }: { shelter: Shelter }) {
  const stats = [
    { label: "Total Adopted", value: 10 },
    { label: "Capacity", value: 30 },
    { label: "Total Rescued", value: 25 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Shelter Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-primary/10 p-4 rounded-md shadow-mm text-center"
          >
            <p className="text-sm font-semibold text-gray-500">{stat.label}</p>
            <p className="text-2xl mt-2">{stat.value}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 mt-8">Shelter Information</h2>
        <Card className="p-0 overflow-hidden">
          <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row gap-y-4 gap-x-8">
          {/* Image */}
          <div>
            <Image
              src={shelter.profileImage}
              alt={shelter.name}
              width={240}
              height={240}
              className="max-h-60"
              objectFit="cover"
            />
          </div>
          {/* Details */}
          <div className="flex flex-col gap-2 py-6">
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-gray-500">Name:</p>
              <p>{shelter.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-gray-500">Email:</p>
              <p>{shelter.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-gray-500">Phone:</p>
              <p>{shelter.phone}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-gray-500">Location:</p>
              <p>{shelter.location}</p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm font-semibold text-gray-500">Available Time:</p>
              <p>
                {shelter.availableTime.from} - {shelter.availableTime.to}
              </p>
            </div>
          </div>
        </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
