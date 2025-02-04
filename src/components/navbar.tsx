"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  return (
    <nav className="py-5 flex items-center gap-3 max-w-5xl mx-auto">
      <Link
        href={"/"}
        className={`${
          pathName === "/" ? "bg-black text-white" : "bg-transparent text-black"
        } px-2 py-1 border text-sm rounded-md hover:border-black/70 transition-colors duration-200`}
      >
        Home
      </Link>
      <Link
        href={"/attendee-summary"}
        className={`${
          pathName === "/attendee-summary"
            ? "bg-black text-white"
            : "bg-transparent text-black"
        } px-2 py-1 border text-sm rounded-md hover:border-black/70 transition-colors duration-200`}
      >
        View Summary
      </Link>
    </nav>
  );
};
export default Navbar;
