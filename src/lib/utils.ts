import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Attendance } from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // Ensure valid date
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function convertDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export function organiseData(arr: Attendance[]) {
  let result: { [key: string]: Attendance[] } = {};

  for (let i = 0; i < arr.length; i++) {
    if (result.hasOwnProperty(convertDate(arr[i].createdAt))) {
      result[convertDate(arr[i].createdAt)].push(arr[i]);
    } else {
      result[convertDate(arr[i].createdAt)] = [];
      result[convertDate(arr[i].createdAt)].push(arr[i]);
    }
  }

  return result;
}

export function convertDateFormat(dateStr: string): string {
  const [month, day, year] = dateStr.split("/"); // Split by "/"
  return `${month}-${day}-${year}`; // Rearrange to "mm-dd-yyyy"
}
