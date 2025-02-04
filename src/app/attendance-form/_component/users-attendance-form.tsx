import { formatDate } from "@/lib/utils";
import RegistrationForm from "./registration-form";
import Link from "next/link";

export default async function AttendanceFormView() {
  return (
    <main className="container mx-auto p-4 bordery max-w-3xl">
      <div className="flex flex-col items-centery justify-betweeny">
        <h1 className=" bg-black/80 px-2 py-1 text-white w-fit font-medium mb-1 rounded-md">
          Attendance Form
        </h1>
        <p className="mb-4 text-sm text-gray-400 flex flex-coly items-center gap-1">
          <span className="text-sm">Date:</span>
          {formatDate(new Date().toLocaleDateString())}
        </p>
      </div>
      <RegistrationForm />
      <div className="mt-8 flex justify-end w-full">
        <Link
          href="/attendee-summary"
          className="text-blue-500 hover:underline"
        >
          View Attendee Summary
        </Link>
      </div>
    </main>
  );
}
