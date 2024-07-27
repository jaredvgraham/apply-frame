import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-black text-gray-200 p-4 flex justify-between">
      <div>
        <Link href="/" className="mr-4">
          Home
        </Link>
        <Link href="/dashboard" className="mr-4">
          Dashboard
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
