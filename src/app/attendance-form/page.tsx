import { CircleAlert } from "lucide-react";
import AttendanceFormView from "./_component/users-attendance-form";

export default function RegularMembersAttendancePage() {
  return (
    <section className="flex flex-col gap-5 items-center justify-center min-h-screen">
      <section className="w-fit">
        <div className="border px-3 py-2 rounded-md bg-blue-200 text-blue-800 flex items-center justify-start gap-1">
          <CircleAlert size={12} />
          <p className="text-xs">
            This attendance is grouped per day, this means that every attendance
            taking today will be grouped together.
          </p>
        </div>
        <AttendanceFormView />
      </section>
    </section>
  );
}
