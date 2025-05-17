"use client";

import { useEffect, useState } from "react";

export default function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [whatsappLink, setWhatsappLink] = useState(""); // Menyimpan link WhatsApp
  const [showModal, setShowModal] = useState(false); // Menyimpan status modal
  const [filterStatus, setFilterStatus] = useState("all");

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

  const markAsCompleted = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/booking/${id}/complete`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Booking ditandai sebagai selesai.");

        // Menampilkan link WhatsApp untuk review
        const reviewLink = data.whatsapp_link;
        if (reviewLink) {
          setWhatsappLink(reviewLink); // Set link WhatsApp yang diterima
          setShowModal(true); // Menampilkan modal
        }

        // Refresh data booking
        fetchBookings();
      } else {
        alert(data.message || "Terjadi kesalahan.");
      }
    } catch (error) {
      console.error("Error marking booking as completed:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Menutup modal
    setWhatsappLink(""); // Menghapus link WhatsApp
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (isoDateStr) => {
    const tanggal = new Date(isoDateStr);
    return tanggal.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      approved: 0,
      completed: 0,
    };

    bookings.forEach((b) => {
      const status = b.status || "pending";
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    });

    return counts;
  };
  const statusCounts = getStatusCounts();
  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((b) => (b.status || "pending") === filterStatus);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manajemen Booking</h2>
      {loading ? (
        <p>Memuat data booking...</p>
      ) : bookings.length === 0 ? (
        <p>Tidak ada data booking.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Statistik */}
            <div className="flex gap-4">
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow">
                Pending: <strong>{statusCounts.pending}</strong>
              </div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow">
                Approved: <strong>{statusCounts.approved}</strong>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow">
                Completed: <strong>{statusCounts.completed}</strong>
              </div>
            </div>

            {/* Dropdown filter */}
            <div>
              <label className="mr-2 font-medium">Filter Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded"
              >
                <option value="all">Semua</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

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
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredBookings.map((booking) => {
                const phoneWithCode = booking.phone.replace(/^0/, "62");
                const message = `Halo ${booking.name}, ini dari Yoga Gallery. Booking Anda pada tanggal ${booking.date} pukul ${booking.start_time} sudah kami terima. Terima kasih telah memesan jasa kami!`;
                const waLink = `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(
                  message
                )}`;

                return (
                  <tr
                    key={booking.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{booking.name}</td>
                    <td className="px-4 py-3">{booking.email}</td>
                    <td className="px-4 py-3">{booking.phone}</td>
                    <td className="px-4 py-3">{formatDate(booking.date)}</td>
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
                    <td className="px-4 py-3 capitalize">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-medium shadow
                        ${
                          booking.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : booking.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status || "pending"}
                      </span>
                    </td>

                    <td className="px-4 flex py-3 space-x-2">
                      <a
                        href={`/admin/booking/${booking.id}`}
                        className="text-blue-600 hover:underline whitespace-nowrap"
                      >
                        Lihat Detail
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal untuk menampilkan link WhatsApp */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-2xl shadow-xl bg-white max-w-sm w-full text-center">
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-500 w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-green-700">
              Success!
            </h2>
            <p className="text-gray-700 mb-4">
              Booking berhasil ditandai sebagai selesai. Klik link di bawah
              untuk memberikan review:
            </p>
            <div className="flex items-center flex-col">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block whitespace-nowrap"
              >
                Klik di sini untuk memberikan review
              </a>
              <button
                onClick={closeModal}
                className=" w-24 mt-4 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
