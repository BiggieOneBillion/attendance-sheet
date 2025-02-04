import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  summary: {
    [key: string]: any[];
  };
  day: string;
  btnSize: "sm" | "lg" | "default" | "icon" | null | undefined;
};

const DownloadCSVBtn = ({ day, summary, btnSize = "sm" }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDownloadCSV = () => {
    startTransition(async () => {
      try {
        const response = await axios.post(
          `/api/download-attendees?date=${day}`,
          {
            attendees: summary[day],
          },
          {
            responseType: "blob",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Create a Blob from response.data
        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        // Trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = `Attendance-List-${new Date().toLocaleDateString()}.csv`;
        document.body.appendChild(a);
        a.click();

        // Cleanup the added html
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        //  Alert the user that the download is done
        toast("Download Successful", {
          description: `CSV File Downloaded`,
        });
      } catch (error) {
        toast("Error Downloading", {
          description: `Error: ${(error as Error).message}`,
        });
      }
    });
  };
  return (
    <Button onClick={handleDownloadCSV} variant="outline" size={btnSize}>
      {/* <Link href={`/api/download-attendees?date=${day}`}>Download CSV</Link> */}
      {isPending ? "Downloaidng" : "Download CSV"}
    </Button>
  );
};
export default DownloadCSVBtn;
