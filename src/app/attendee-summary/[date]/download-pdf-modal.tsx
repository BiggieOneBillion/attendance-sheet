"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import PDFDownloadButton from "./pdf-download-btn";
import { Attendee } from "./attendee-table";
import { FileDown } from "lucide-react";


export function PDFDownloadModal({
  date,
  attendees,
}: {
  date: string;
  attendees: Attendee[];
}) {
  const [isOpen, setIsOpen] = useState(false);

//   const handleClose = () => setIsOpen(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <FileDown className="mr-2 h-3 w-3" />
          Download PDF
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            It is advisable to clear the storage after downloading the pdf as
            the app stores information in the browser.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <PDFDownloadButton attendees={attendees} date={date} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
