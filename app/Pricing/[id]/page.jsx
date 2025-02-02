"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function PackageDetail({ params }) {
  const router = useRouter();
  const resolvedParams = use(params); // Unwrap Promise
  const id = resolvedParams?.id;

  const [packageData, setPackageData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const [availableTimes, setAvailableTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      async function fetchPackageDetail() {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
          const response = await fetch(`${API_URL}/packages/${id}`);
          const data = await response.json();
          setPackageData(data);
        } catch (err) {
          console.error("Failed to fetch package details", err);
        }
      }
      fetchPackageDetail();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "date") {
      fetchAvailableTimes(value); // Fetch available times based on selected date
    }
  };

  const fetchAvailableTimes = async (selectedDate) => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      // Use query parameters for GET request
      const response = await fetch(
        `${API_URL}/check-availability?date=${selectedDate}`,
        {
          method: "GET", // GET method
          headers: {
            "Content-Type": "application/json", // This can be omitted for GET requests
          },
        }
      );

      const data = await response.json();

      console.log("Available Times Data:", data); // Check the data structure

      if (data.available) {
        setAvailableTimes(data.availableTimes); // Set available times
      } else {
        setAvailableTimes([]); // No available times
        setFormData((prev) => ({ ...prev, time: "" }));
      }
    } catch (err) {
      console.error("Failed to fetch available times", err);
      setError("Terjadi kesalahan, coba lagi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      setError("Semua kolom wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate booking process by calling backend API
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/book-appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.message === "Appointment booked successfully!") {
        alert(data.message);
        router.push("/thank-you");
      } else {
        setError("Gagal memesan waktu, coba lagi.");
      }
    } catch (err) {
      console.error("Failed to book appointment", err);
      setError("Terjadi kesalahan, coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!packageData)
    return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="container mx-auto mt-8 p-4 lg:p-8 bg-white shadow-lg rounded-2xl">
      {/* Package Detail */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-primary">
          {packageData.name}
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Harga:{" "}
          <span className="font-semibold text-green-600">
            Rp {packageData.price.toLocaleString("id-ID")}
          </span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Durasi: {packageData.duration}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Jumlah Foto: {packageData.total_photos} (edit{" "}
          {packageData.edited_photos})
        </p>
        <ul className="mt-4 text-sm text-gray-600 list-disc pl-5">
          {Array.isArray(JSON.parse(packageData.includes)) &&
            JSON.parse(packageData.includes).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>
        <p className="mt-4 font-bold text-sm text-primary">Cocok untuk:</p>
        <h2 className="text-gray-700 text-sm">{packageData.suitable_for}</h2>
      </div>

      {/* Booking Form */}
      <div className="border-t-2 pt-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Form Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
              placeholder="Masukkan email aktif"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
            />
          </div>

          {/* Available Times Dropdown */}
          {formData.date && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jam
              </label>
              {availableTimes.length > 0 ? (
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
                >
                  <option value="">Pilih Jam</option>
                  {availableTimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-red-500 mt-2">
                  Tidak ada jam yang tersedia untuk tanggal ini.
                </p>
              )}
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-bold transition-transform transform ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-dark hover:scale-105"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Memproses..." : "Booking Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
}
