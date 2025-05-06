"use client";
import { useEffect, useState } from "react";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    fetch("http://localhost:8000/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manajemen Booking</h2>
      {loading ? (
        <p>Memuat data booking...</p>
      ) : bookings.length === 0 ? (
        <p>Tidak ada data booking.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">No HP</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3">Alamat</th>
                <th className="px-4 py-3">Keperluan</th>
                <th className="px-4 py-3">Paket</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{booking.name}</td>
                  <td className="px-4 py-3">{booking.email}</td>
                  <td className="px-4 py-3">{booking.phone}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">
                    {booking.start_time} - {booking.end_time}
                  </td>
                  <td className="px-4 py-3">{booking.address}</td>
                  <td className="px-4 py-3">
                    {Array.isArray(booking.purposes)
                      ? booking.purposes.join(", ")
                      : JSON.parse(booking.purposes || "[]").join(", ")}
                  </td>
                  <td className="px-4 py-3">{booking.package_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
