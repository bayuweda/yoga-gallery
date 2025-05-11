"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation"; // untuk Next.js 13+ (app router)

export default function ReviewForm() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Review berhasil dikirim!");
      setName("");
      setRating(5);
      setComment("");
    } else {
      setMessage(data.message || "Gagal mengirim review.");
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
      >
        Kirim Review
      </button>
    </form>
  );
}
