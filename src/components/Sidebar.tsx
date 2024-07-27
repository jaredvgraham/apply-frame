import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-background-alt-color text-text-color p-4">
      <ul>
        <li className="mb-2">
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link href="/dashboard/profile">Profile</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
