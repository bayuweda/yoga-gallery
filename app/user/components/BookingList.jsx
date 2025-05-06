// components/BookingList.jsx
const bookings = [
  { id: 1, date: "2025-05-10", service: "Photoshoot Prewedding" },
  { id: 2, date: "2025-06-15", service: "Dokumentasi Event" },
];

export default function BookingList() {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Bookingan Saya</h2>
      <ul className="space-y-3">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="border p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <p className="font-medium">{booking.service}</p>
            <p className="text-sm text-gray-500">{booking.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
