"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// SVG Heroicons
const DashboardIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"
    />
  </svg>
);

const ServiceIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7.5l9-4.5 9 4.5M4.5 10.5h15m-15 3h15m-15 3h15"
    />
  </svg>
);

const BookingIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 10h10m-10 4h6M5.25 6.75h13.5c.414 0 .75.336.75.75v12a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75v-12c0-.414.336-.75.75-.75z"
    />
  </svg>
);

const UsersIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.25 6.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0v.75a6.75 6.75 0 01-6.75 6.75H6.75A6.75 6.75 0 010 7.5V6.75"
    />
  </svg>
);

const ScheduleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-4 10h4m-8 0h.008M4.5 6.75h15c.414 0 .75.336.75.75v12a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75v-12c0-.414.336-.75.75-.75z"
    />
  </svg>
);

const navItems = [
  { name: "Dashboard", icon: DashboardIcon, path: "/admin/dashboard" },
  { name: "Service", icon: ServiceIcon, path: "/admin/service" },
  { name: "Booking", icon: BookingIcon, path: "/admin/booking" },
  { name: "Users", icon: UsersIcon, path: "/admin/users" },
  { name: "Schedule", icon: ScheduleIcon, path: "/admin/slotManager" }, // NEW
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-950 text-white min-h-screen p-4">
      <div className="flex flex-col items-center w-full mb-11 ">
        <h2 className="text-xl font-bold mb-6"> YOGA GALLERY</h2>
        <img className="w-24" src="/assets/logo-login.png" alt="" />
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition ${
              pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
