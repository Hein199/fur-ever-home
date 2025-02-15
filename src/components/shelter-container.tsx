import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getShelters } from "@/mocks/shelter";
import Image from "next/image";
import Link from "next/link";

export default function ShelterContainer(props: {
  page: number;
  limit: number;
}) {
  const { page, limit } = props;
  const shelters = getShelters(page).slice(0, limit);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {shelters.map((shelter) => (
        <Link
          key={shelter.id}
          href={`/app/shelters/${shelter.id}`}
          className="block"
        >
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <Image
                src={shelter.profileImage}
                alt={shelter.name}
                width={400}
                height={300}
                className="w-full"
                objectFit="cover"
              />
              <CardTitle className="py-2 px-4">{shelter.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2 px-4 line-clamp-1">
              {/* <p>{shelter.description}</p> */}
              <p>{shelter.location}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
