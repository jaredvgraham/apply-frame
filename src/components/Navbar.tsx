"use client";
import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const isLandingPage =
    pathname === "/landing" || pathname === "/signup" || pathname === "/login";
  return (
    !isLandingPage && (
      <nav className=" bg-backgroundAlt text-text p-4 flex border border-border justify-between">
        <div>
          <Link href="/dashboard" className="mr-4">
            Home
          </Link>
          <Link href="/upload-resume" className="mr-4">
            Upload Resume
          </Link>
          <button onClick={logout} className="mr-4">
            Logout
          </button>
        </div>
        <ThemeToggle />
      </nav>
    )
  );
};

export default Navbar;
