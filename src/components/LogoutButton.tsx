// src/components/LogoutButton.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import exp from "constants";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redirect to the sign-in page after logout
  };

  return (
    <button className="w-20 bg-white" onClick={handleLogout}>
      Logout
    </button>
  );
};
export default LogoutButton;
