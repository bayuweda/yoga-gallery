"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [todayBookings, setTodayBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState(null);
  const [totalBookings, setTotalBookings] = useState(0); // Total Booking
  const [totalUsers, setTotalUsers] = useState(0); // Total User

  // Fungsi untuk mengambil data booking hari ini
  async function fetchBookings() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/bookings`);
      const data = await response.json();

      setTotalBookings(data.length); // Menghitung total booking
    } catch (err) {
      console.error("Error fetching today's bookings:", err);
      setError("Gagal memuat jadwal hari ini.");
    } finally {
      setLoadingBookings(false);
    }
  }
  async function fetchTodayBookings() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/bookings/today`);
      const data = await response.json();
      setTodayBookings(data);
    } catch (err) {
      console.error("Error fetching today's bookings:", err);
      setError("Gagal memuat jadwal hari ini.");
    } finally {
      setLoadingBookings(false);
    }
  }

  // Fungsi untuk mengambil data pengguna (users)
  async function fetchUsers() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();
      setUsers(data);
      setTotalUsers(data.length); // Menghitung total user
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Gagal memuat data pengguna.");
    } finally {
      setLoadingUsers(false);
    }
  }

  useEffect(() => {
    fetchBookings();
    fetchTodayBookings();
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
          <p className="text-sm text-gray-500">Total Booking</p>
          <p className="text-2xl font-bold">
            {loadingBookings ? "..." : totalBookings}
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <p className="text-sm text-gray-500">Total User</p>
          <p className="text-2xl font-bold">
            {loadingUsers ? "..." : totalUsers}
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <p className="text-sm text-gray-500">Jadwal Hari Ini</p>
          <p className="text-2xl font-bold">
            {loadingBookings ? "..." : todayBookings.length}
          </p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <p className="text-sm text-gray-500">Paket Terfavorit</p>
          <p className="text-xl font-semibold">Wedding Package</p>
        </div>
      </div>

      {/* Jadwal Hari Ini */}
      <div>
        <h3 className="text-lg font-semibold mb-2">📅 Jadwal Hari Ini</h3>

        {loadingBookings && (
          <p className="text-gray-600">Memuat data booking...</p>
        )}
        {loadingUsers && (
          <p className="text-gray-600">Memuat data pengguna...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {!loadingBookings && todayBookings.length === 0 && (
          <p className="text-gray-500">Belum ada jadwal hari ini.</p>
        )}

        {!loadingBookings && todayBookings.length > 0 && (
          <ul className="bg-white rounded shadow divide-y">
            {todayBookings.map((item) => (
              <li key={item.id} className="p-4">
                <p className="font-bold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.start_time} - {item.end_time} @ {item.address}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
