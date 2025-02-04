// components/PDFDownloadButton.tsx
"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import PDFContent from "./pdf-content";
import type { Attendee } from "./attendee-table";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";

// const PDFDownloadLink = dynamic(
//   () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
//   { ssr: false }
// );

interface PDFDownloadButtonProps {
  attendees: Attendee[];
  date: string;
}

function PDFDownloadButton({ attendees, date }: PDFDownloadButtonProps) {
  return (
    <PDFDownloadLink
      document={<PDFContent attendees={attendees} date={date} />}
      fileName={`attendees-${date}.pdf`}
    >
      <span className="flex items-center gap-1">
        <FileDown className="mr-2 h-3 w-3" />
        Download PDF
      </span>
    </PDFDownloadLink>
  );
}

export default React.memo(PDFDownloadButton);
