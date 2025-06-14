"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import {
  CalendarDaysIcon,
  UserGroupIcon,
  ClockIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const router = useRouter();

  const [todayBookings, setTodayBookings] = useState([]);
  const [weeklyBookings, setWeeklyBookings] = useState([]);
  const [users, setUsers] = useState([]);

  const [loadingTotalBookings, setLoadingTotalBookings] = useState(true);
  const [loadingTodayBookings, setLoadingTodayBookings] = useState(true);
  const [loadingWeeklyBookings, setLoadingWeeklyBookings] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [errorTotalBookings, setErrorTotalBookings] = useState(null);
  const [errorTodayBookings, setErrorTodayBookings] = useState(null);
  const [errorWeeklyBookings, setErrorWeeklyBookings] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);

  // state untuk kontrol tampilan jadwal
  const [activeSchedule, setActiveSchedule] = useState("today");

  useEffect(() => {
    const token = Cookies.get("jwt");
    const role = Cookies.get("role");

    if (!token) {
      router.replace("/login");
      return;
    }

    // if (role !== "owner" || role !== "admin") {
    //   router.replace("/unauthorized");
    //   return;
    // }
  }, [router]);

  async function fetchBookings() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/bookings`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setTotalBookings(data.length);
    } catch (err) {
      console.error("Error fetching total bookings:", err);
      setErrorTotalBookings("Gagal memuat total booking.");
    } finally {
      setLoadingTotalBookings(false);
    }
  }

  async function fetchTodayBookings() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/bookings/today`);
      if (!response.ok) throw new Error("Failed to fetch today's bookings");
      const data = await response.json();
      setTodayBookings(data);
    } catch (err) {
      console.error("Error fetching today's bookings:", err);
      setErrorTodayBookings("Gagal memuat jadwal hari ini.");
    } finally {
      setLoadingTodayBookings(false);
    }
  }

  async function fetchWeeklyBookings() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/bookings/weekly`);
      if (!response.ok) throw new Error("Failed to fetch weekly bookings");
      const data = await response.json();
      setWeeklyBookings(data);
    } catch (err) {
      console.error("Error fetching weekly bookings:", err);
      setErrorWeeklyBookings("Gagal memuat jadwal minggu ini.");
    } finally {
      setLoadingWeeklyBookings(false);
    }
  }

  async function fetchUsers() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
      setTotalUsers(data.length);
    } catch (err) {
      console.error("Error fetching users:", err);
      setErrorUsers("Gagal memuat data pengguna.");
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    fetchBookings();
    fetchTodayBookings();
    fetchWeeklyBookings();
    fetchUsers();
  }, []);

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-2">
        Selamat Datang di Admin Dashboard
      </h2>
      <p className="mb-6 text-gray-600">
        Pilih salah satu menu di samping untuk mulai mengelola data.
      </p>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow text-center">
          <div className="flex justify-center mb-2">
            <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500">Total Booking</p>
          <p className="text-2xl font-bold">
            {loadingTotalBookings ? "..." : totalBookings}
          </p>
          {errorTotalBookings && (
            <p className="text-red-500 text-xs mt-1">{errorTotalBookings}</p>
          )}
        </div>

        <div className="p-4 bg-white rounded shadow text-center">
          <div className="flex justify-center mb-2">
            <UserGroupIcon className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Total User</p>
          <p className="text-2xl font-bold">
            {loadingUsers ? "..." : totalUsers}
          </p>
          {errorUsers && (
            <p className="text-red-500 text-xs mt-1">{errorUsers}</p>
          )}
        </div>

        <div
          onClick={() => setActiveSchedule("today")}
          className={`p-4 rounded shadow text-center cursor-pointer ${
            activeSchedule === "today" ? "bg-blue-100" : "bg-white"
          }`}
        >
          <div className="flex justify-center mb-2">
            <ClockIcon className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-sm text-gray-500">Jadwal Hari Ini</p>
          <p className="text-2xl font-bold">
            {loadingTodayBookings ? "..." : todayBookings.length}
          </p>
          {errorTodayBookings && (
            <p className="text-red-500 text-xs mt-1">{errorTodayBookings}</p>
          )}
        </div>

        <div
          onClick={() => setActiveSchedule("weekly")}
          className={`p-4 rounded shadow text-center cursor-pointer ${
            activeSchedule === "weekly" ? "bg-blue-100" : "bg-white"
          }`}
        >
          <div className="flex justify-center mb-2">
            <CalendarIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-sm text-gray-500">Jadwal Minggu Ini</p>
          <p className="text-2xl font-bold">
            {loadingWeeklyBookings ? "..." : weeklyBookings.length}
          </p>
          {errorWeeklyBookings && (
            <p className="text-red-500 text-xs mt-1">{errorWeeklyBookings}</p>
          )}
        </div>
      </div>

      {/* Toggle Jadwal Hari Ini / Minggu Ini */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {activeSchedule === "today"
            ? "📅 Jadwal Hari Ini"
            : "📅 Jadwal Minggu Ini"}
        </h3>

        {activeSchedule === "today" && (
          <>
            {loadingTodayBookings && (
              <p className="text-gray-600">Memuat data booking hari ini...</p>
            )}
            {!loadingTodayBookings && todayBookings.length === 0 && (
              <p className="text-gray-500">Belum ada jadwal hari ini.</p>
            )}
            {!loadingTodayBookings && todayBookings.length > 0 && (
              <ul className="bg-white rounded shadow divide-y">
                {todayBookings.map((booking) => (
                  <li key={booking.id} className="p-4 border-b last:border-b-0">
                    <a href={`/admin/booking/${booking.id}`}>
                      <p className="font-bold">{booking.name}</p>
                      <p className="text-sm text-gray-600">
                        Tanggal:{" "}
                        {new Date(booking.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.start_time} - {booking.end_time} @{" "}
                        {booking.address}
                      </p>
                      <p
                        className={`text-sm font-semibold mt-1 ${
                          booking.status === "pending"
                            ? "text-yellow-600"
                            : booking.status === "approved"
                            ? "text-blue-600"
                            : booking.status === "completed"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        Status: {booking.status}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {activeSchedule === "weekly" && (
          <>
            {loadingWeeklyBookings && (
              <p className="text-gray-600">Memuat data booking minggu ini...</p>
            )}
            {!loadingWeeklyBookings && weeklyBookings.length === 0 && (
              <p className="text-gray-500">Belum ada jadwal minggu ini.</p>
            )}
            {!loadingWeeklyBookings && weeklyBookings.length > 0 && (
              <ul className="bg-white rounded shadow divide-y">
                {weeklyBookings.map((booking) => (
                  <li key={booking.id} className="border-b last:border-b-0">
                    <a
                      href={`/admin/booking/${booking.id}`}
                      className="block p-4 hover:bg-gray-50 transition duration-200"
                    >
                      <p className="font-bold">{booking.name}</p>
                      <p className="text-sm text-gray-600">
                        Tanggal:{" "}
                        {new Date(booking.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.start_time} - {booking.end_time} @{" "}
                        {booking.address}
                      </p>
                      <p
                        className={`text-sm font-semibold mt-1 ${
                          booking.status === "pending"
                            ? "text-yellow-600"
                            : booking.status === "approved"
                            ? "text-blue-600"
                            : booking.status === "completed"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        Status: {booking.status}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
