"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BookingDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchBooking = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/bookings/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil detail booking");

        const data = await res.json();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleMarkAsCompleted = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/booking/${id}/complete`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Booking ditandai sebagai selesai");
        setBooking((prev) => ({ ...prev, status: "completed" }));
        // Optional: buka review WA
        if (data.whatsapp_link) window.open(data.whatsapp_link, "_blank");
      } else {
        alert(data.message || "Gagal menyelesaikan booking");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyelesaikan booking");
    }
  };

  const generateWhatsAppLink = () => {
    if (!booking) return "#";
    const phoneWithCode = booking.phone.replace(/^0/, "62");
    const message = `Halo ${booking.name}, ini dari Yoga Gallery. Booking Anda pada tanggal ${booking.date} pukul ${booking.start_time} sudah kami terima. Terima kasih telah memesan jasa kami!`;
    return `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(message)}`;
  };

  if (loading) return <p>Memuat detail booking...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!booking) return <p>Booking tidak ditemukan.</p>;

  const handleApprove = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/booking/${id}/approve`,
        {
          method: "POST",
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Booking berhasil disetujui!");
        setBooking((prev) => ({ ...prev, status: "approved" }));
      } else {
        alert(data.message || "Gagal menyetujui booking");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyetujui booking");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Detail Booking
        </h1>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Nama:</strong> {booking.name}
          </p>
          <p>
            <strong>Email:</strong> {booking.email}
          </p>
          <p>
            <strong>Telepon:</strong> {booking.phone}
          </p>
          <p>
            <strong>Tanggal:</strong> {booking.date}
          </p>
          <p>
            <strong>Waktu:</strong> {booking.start_time} - {booking.end_time}
          </p>
          <p>
            <strong>Alamat:</strong> {booking.address}
          </p>
          <p>
            <strong>Keperluan:</strong>{" "}
            {Array.isArray(booking.purposes)
              ? booking.purposes.join(", ")
              : JSON.parse(booking.purposes || "[]").join(", ")}
          </p>
          <p>
            <strong>Paket:</strong> {booking.package_id}
          </p>
          <p>
            <strong>Status:</strong> {booking.status}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Kirim WhatsApp
          </a>

          {booking.status !== "completed" && (
            <button
              onClick={handleMarkAsCompleted}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tandai Selesai
            </button>
          )}

          {booking.status === "pending" && (
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Setujui Booking
            </button>
          )}

          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
