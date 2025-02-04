import AttendeeTable from "./attendee-table";
import { formatDate } from "@/lib/utils";
import { ClearStorage } from "./clear-storage";

export default async function AttendeeListPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  return (
    <div className="container mx-auto max-w-5xl p-4 space-y-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h1 className=" bg-black/80 px-2 py-1 text-white w-fit font-medium rounded-md">
            Attendees List
          </h1>
          <span>-</span>
          <p className="text-sm text-gray-400 flex flex-coly items-center gap-1">
            <span className="text-sm">Date:</span>
            {formatDate(date)}
          </p>
        </div>
        <ClearStorage date={date} />
      </header>
      <AttendeeTable date={date} />
    </div>
  );
}
