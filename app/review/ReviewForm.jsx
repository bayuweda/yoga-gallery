"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ReviewForm() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const token = searchParams.get("token");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking_id: bookingId,
          name,
          rating,
          comment,
          token,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setShowModal(true);
        setName("");
        setRating(5);
        setComment("");

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        if (response.status === 409) {
          setMessage("Kamu sudah mengirim review untuk booking ini.");
        } else if (data.errors) {
          const messages = Object.values(data.errors).flat().join(" ");
          setMessage(messages);
        } else {
          setMessage(data.message || "Gagal mengirim review.");
        }
      }
    } catch (error) {
      setLoading(false);
      setMessage("Terjadi kesalahan, coba lagi.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 text-black rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">
            Tulis Review Anda
          </h2>

          {message && (
            <div className="mb-4 text-sm text-red-600">{message}</div>
          )}

          <div className="mb-4">
            <label className="block font-medium mb-1">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Rating (1-5)</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Komentar</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Kirim Review"}
          </button>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <h2 className="text-xl font-bold text-green-600 mb-2">
              Terima kasih!
            </h2>
            <p className="text-gray-700">Review kamu berhasil dikirim.</p>
            <p className="text-gray-500 text-sm mt-2">
              Kamu akan diarahkan ke halaman utama...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
