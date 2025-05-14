"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation"; // untuk Next.js 13+ (app router)

export default function ReviewForm() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");
  const token = searchParams.get("token"); // Ambil token dari URL

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setLoading(true); // Set loading state

    try {
      const response = await fetch("http://localhost:8000/api/reviews", {
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
      console.log(data); // Tambahkan ini untuk melihat data error

      setLoading(false); // Reset loading state

      if (response.ok) {
        setMessage("Review berhasil dikirim!");
        setName("");
        setRating(5);
        setComment("");
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
      setLoading(false); // Reset loading state in case of error
      setMessage("Terjadi kesalahan, coba lagi.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto text-black bg-white p-6 rounded shadow"
    >
      <h2 className="text-lg font-bold mb-4">Tulis Review Anda</h2>

      {message && <div className="mb-4 text-sm text-green-600">{message}</div>}

      <div className="mb-4">
        <label className="block font-medium mb-1">Nama</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Rating (1-5)</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
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
          className="w-full border px-3 py-2 rounded"
          rows="4"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Mengirim..." : "Kirim Review"}
      </button>
    </form>
  );
}
