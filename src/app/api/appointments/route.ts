// src/app/api/appointments/route.ts
import { NextResponse } from "next/server";
import { getAppointmentsForShelter, getAppointmentPageCountForShelter } from "@/lib/database";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shelterId = searchParams.get("shelterId");
  const page = searchParams.get("page") || "1";

  if (!shelterId) {
    return NextResponse.json({ error: "Shelter ID is required" }, { status: 400 });
  }

  const appointments = await getAppointmentsForShelter(parseInt(shelterId), parseInt(page));
  const pageCount = await getAppointmentPageCountForShelter(parseInt(shelterId));

  return NextResponse.json({ appointments, pageCount });
}