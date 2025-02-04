import { NextResponse } from "next/server";

type bodyData = {
  attendees: {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
    createdAt: string;
    id: number;
  }[];
};

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required" },
      { status: 400 }
    );
  }

  // GET DATA TO DOWNLOAD FROM BODY
  const body: bodyData = await request.json();
  const attendees = body.attendees;

  const csvContent = [
    ["First Name", "Last Name", "Email", "Phone", "Address"].join(","),
    ...attendees.map((attendee) =>
      [
        attendee.firstName,
        attendee.lastName,
        attendee.email,
        attendee.phone,
        attendee.address.replace(/,/g, ";"),
      ].join(",")
    ),
  ].join("\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="Attendance List-${new Date(
        date
      ).toLocaleDateString()}.csv"`,
    },
  });
}
