"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditAttendeeModal } from "./edit-attendee-modal";
import { DeleteDialog } from "./delete-diaglog";
import { toast } from "sonner";
import PDFDownloadButton from "./pdf-download-btn";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { v4 } from "uuid";
import DownloadCSVBtn from "../_component/download-csv-btn";
import { PDFDownloadModal } from "./download-pdf-modal";

export type Attendee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  // eventId: string;
  createdAt: string;
};

interface AttendeeTableProps {
  date: string;
}

function formatDate(date: string) {
  const [month, day, year] = date.split("-");
  const refDate = `${day}/${month}/${year}`;
  return refDate;
}

export default function AttendeeTable({ date }: AttendeeTableProps) {
  const [attendees, setAttendees] = useState<Attendee[] | null>(null);
  const [editingAttendee, setEditingAttendee] = useState<Attendee | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const attendance = useLiveQuery(() => db.attendees.toArray());

  const handleDelete = async (id: string) => {
    try {
      await db.attendees.where("id").equals(id).delete();
      toast("Attendee deleted", {
        description: "The attendee has been successfully removed.",
      });
      setIsOpen(false); // close the modal
    } catch (error) {
      toast("Failed To Delete", {
        description: "Record not deleted.",
      });
    }
  };

  const handleEdit = (attendee: Attendee) => {
    setEditingAttendee(attendee);
  };

  const handleUpdate = async (updatedAttendee: Attendee) => {
    try {
      await db.attendees.update(updatedAttendee.id, {
        firstName: updatedAttendee.firstName,
        email: updatedAttendee.email,
        lastName: updatedAttendee.lastName,
        address: updatedAttendee.address,
        phone: Number(updatedAttendee.phone),
      });
      toast("Attendee updated", {
        description:
          "The attendee's information has been successfully updated.",
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to update the attendee. Please try again.",
      });
    }
  };

  console.log(editingAttendee);

  useEffect(() => {
    if (attendance) {
      const result = attendance.filter((el) => {
        const [month, day, year] = date.split("-");
        const refDate = `${day}/${month}/${year}`;
        return el.createdAt === refDate;
      });
      setAttendees(result as unknown as Attendee[]);
    }
  }, [attendance]);

  return (
    <div>
      <div className="mb-4 flex justify-end space-x-2">
        {attendees && (
          <PDFDownloadModal attendees={attendees!} date={formatDate(date)} />
        )}
        {attendees && (
          <DownloadCSVBtn
            btnSize="default"
            day={date}
            summary={{
              [date]: attendees!,
            }}
          />
        )}
      </div>

      <Table>
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees?.map((attendee) => (
            <TableRow key={v4()}>
              <TableCell className="capitalize">
                {attendee.firstName} {attendee.lastName}
              </TableCell>
              <TableCell>{attendee.email}</TableCell>
              <TableCell>{attendee.phone}</TableCell>
              <TableCell>{attendee.address}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEdit(attendee)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <DeleteDialog
                    id={attendee.id}
                    open={isOpen}
                    setIsOpen={setIsOpen}
                    fn={() => handleDelete(attendee.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingAttendee && (
        <EditAttendeeModal
          attendee={editingAttendee}
          onClose={() => setEditingAttendee(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}
