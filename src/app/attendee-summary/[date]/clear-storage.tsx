"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

function convertDate(dateStr: string): string {
  // Split the date string by "-"
  const [day, month, year] = dateStr.split("-");
  // Ensure the values are valid before formatting
  if (!day || !month || !year) {
    throw new Error("Invalid date format. Expected format: DD-MM-YYYY");
  }
  // Return the formatted date as MM/DD/YYYY
  return `${month}/${day}/${year}`;
}

export function ClearStorage({ date }: { date: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleClearDb = () => {
    const formmattedDate = convertDate(date);
    startTransition(async () => {
      try {
        await db.attendees.where("createdAt").equals(formmattedDate).delete();
        toast("IndexedDB storage cleared.");
        router.back();
        handleClose();
      } catch (error) {
        toast("Error while deleting.", {
          description: `Error message: ${(error as Error).message}`,
        });
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Clear Storage</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="button" onClick={handleClearDb}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
