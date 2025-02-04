"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertDateFormat, formatDate, organiseData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import DownloadCSVBtn from "./_component/download-csv-btn";
import { ClearStorage } from "./_component/clear-storage";

export default function AttendeeSummaryPage() {
  const attendance = useLiveQuery(() => db.attendees.toArray());

  const [summary, setSummary] = useState<{ [key: string]: any[] }>({});

  console.log("---",summary)

  useEffect(() => {
    if (attendance) {
      const data = organiseData(attendance);
      setSummary(data);
    }
  }, [attendance]);

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <header className="flex items-center justify-between">
        <h1 className=" bg-black/80 px-2 py-1 text-white w-fit font-medium mb-4 rounded-md">
          Attendee Registration Summary Table
        </h1>
        <ClearStorage />
      </header>
      <Table>
        <TableCaption>Summary of attendee registrations by date</TableCaption>
        <TableHeader>
          <TableRow className="grid grid-cols-3">
            <TableHead className="w-full flex items-center justify-start">
              Date
            </TableHead>
            <TableHead className="w-full flex items-center justify-start">
              Number of Registrations
            </TableHead>
            <TableHead className="w-full flex items-center justify-start">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(summary).map((day: string) => {
            return (
              <TableRow key={day} className="grid grid-cols-3">
                <TableCell>{formatDate(day)}</TableCell>
                <TableCell>{summary[day].length}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link
                        href={`/attendee-summary/${convertDateFormat(day)}`}
                      >
                        View List
                      </Link>
                    </Button>
                    <DownloadCSVBtn btnSize="sm" day={day} summary={summary} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
