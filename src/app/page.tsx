"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <section className="flex mt-[30vh] flex-col items-center justify-center">
      <header className="container mx-auto p-4 pt-10 flex justify-center items-center">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-3xl font-semibold">Welcome To Attendance List</h1>
          <p className=" text-sm text-gray-600 text-center">
            This app lets you take attendance of an event or anything at all.{" "}
            <br />
            You can download it as a pdf or csv file
          </p>
        </div>
      </header>
      <button
        onClick={() => router.push("/attendance-form")}
        className="px-5 py-2 text-sm rounded-md border bg-slate-100 text-slate-700 capitalize"
      >
        Click to get started
      </button>
    </section>
  );
}
