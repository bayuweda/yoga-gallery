"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/pages/Navbar";
import Footer from "@/app/components/pages/Footer";

function PackageDetail({ id }) {
  const [packageData, setPackageData] = useState(null);

  const [availableTimes, setAvailableTimes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    phone: "",
    address: "",
    purposes: [],
    package_id: id,
    duration: 1,
  });

  console.log(selected);
  console.log(formData);

  const purposes = [
    "Pertunangan",
    "Acara Bisnis",
    "Pernikahan",
    "Ulang Tahun",
    "Kehamilan",
    "Wisuda",
    "Produk",
    "Bulan Madu",
    "Fashion",
    "Hari Jadi",
    "Makanan",
    "Konferensi",
    "Tim dan Ruang Kerja",
    "Potret Pribadi",
    "Keluarga",
    "Pemotretan Perjalanan",
    "Bayi",
    "Lainnya",
  ];

  const toggleSelection = (purpose) => {
    if (selected.includes(purpose)) {
      setSelected(selected.filter((item) => item !== purpose));
    } else {
      setSelected([...selected, purpose]);
    }
  };

  useEffect(() => {
    if (id) {
      async function fetchPackageDetail() {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
          const response = await fetch(`${API_URL}/packages/${id}`);
          const data = await response.json();
          console.log("data paket ni booss", data);
          setPackageData(data);
        } catch (err) {
          console.error("Failed to fetch package details", err);
        }
      }
      fetchPackageDetail();
    }
  }, [id]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      purposes: selected,
      package_id: packageData?.id || "",
      duration: packageData?.duration || 1,
    }));
  }, [selected, packageData]);

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
      const response = await fetch(
        `${API_URL}/check-availability?date=${selectedDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Available Times Data:", data);

      if (data.available) {
        const bookedTimes = data.bookedTimes || [];

        // Durasi dalam jam, pastikan formData.duration sudah terisi
        const duration = Number(formData.duration || 1);

        // Helper konversi waktu "HH:mm:ss" ke menit dari jam 00:00
        const timeToMinutes = (time) => {
          const [h, m, s] = time.split(":").map(Number);
          return h * 60 + m;
        };

        // Helper menambahkan jam ke waktu "HH:mm:ss"
        const addHours = (time, hoursToAdd) => {
          const [h, m, s] = time.split(":").map(Number);
          const newH = h + hoursToAdd;
          return `${newH.toString().padStart(2, "0")}:${m
            .toString()
            .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
        };

        // Ubah waktu-waktu tersedia ke dalam format HH:mm
        const availableHHMM = data.availableTimes.map((t) => t.slice(0, 5));

        const filtered = data.availableTimes.filter((startTime) => {
          const start = startTime.slice(0, 5); // "HH:mm"
          const endTime = addHours(startTime, duration);
          const end = endTime.slice(0, 5); // "HH:mm"

          // 1. Pastikan semua jam dalam durasi tersedia (misalnya: 19:00 dan 20:00 untuk durasi 2 jam)
          for (let i = 0; i < duration; i++) {
            const slot = addHours(startTime, i).slice(0, 5);
            if (!availableHHMM.includes(slot)) {
              return false;
            }
          }

          // 2. Pastikan endTime tidak melewati jam terakhir dari availableTimes
          const latestAvailable = availableHHMM[availableHHMM.length - 1];
          if (end > latestAvailable) return false;

          // 3. Cek apakah rentang waktu ini bertabrakan dengan waktu yang sudah dibooking
          for (let booked of bookedTimes) {
            const bookedStart = booked.start.slice(0, 5);
            const bookedEnd = addHours(booked.start, booked.duration).slice(
              0,
              5
            );

            if (
              (start >= bookedStart && start < bookedEnd) ||
              (end > bookedStart && end <= bookedEnd) ||
              (bookedStart >= start && bookedStart < end)
            ) {
              return false;
            }
          }

          return true;
        });

        console.log("✅ Filtered Times Setelah Validasi Durasi:", filtered);

        setAvailableTimes(filtered);
      } else {
        setAvailableTimes([]);
        setFormData((prev) => ({ ...prev, time: "" }));
      }
    } catch (err) {
      console.error("Failed to fetch available times", err);
      setError("Terjadi kesalahan, coba lagi.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form untuk memastikan semua kolom wajib diisi
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      setError("Semua kolom wajib diisi!");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/book-appointment`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.message === "Appointment booked successfully!") {
        alert(data.message);

        const total = packageData.price;

        // Menambahkan alamat dan no telepon pada query parameter
        router.push(
          `/payment?total=${total}&package=${
            packageData.name
          }&address=${encodeURIComponent(formData.address)}&phone=${
            formData.phone
          }&name=${formData.name}`
        );
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

  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const duration = Number(formData.duration || 1);
    let endHours = hours + duration;

    if (endHours >= 24) endHours -= 24;

    return `${endHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  const removeSeconds = (time) => {
    if (!time || !time.includes(":")) {
      console.error("Format waktu salah:", time);
      return "Invalid Time";
    }
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  console.log("data jam", availableTimes);
  console.log("data paket ", packageData);

  if (!packageData)
    return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <>
      <section className="mt-24  bg-white">
        {/* Section Header */}
        <section className="font-playfair ">
          <div className="relative bg-[url('/assets/bg-packagedetail.png')] bg-cover bg-center w-full h-[400px]">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

            {/* Konten */}
            <div className="relative z-10 h-full flex items-center justify-center px-6 py-16">
              <div className="text-center space-y-5 max-w-2xl">
                {/* Judul */}
                <h1 className="text-4xl lg:text-5xl font-bold text-yellow-300 drop-shadow-lg leading-snug tracking-wide">
                  Hallo selamat datang di halaman booking
                </h1>

                {/* Nama Paket */}
                <div>
                  <span className="text-yellow-300 border border-yellow-500 px-6 py-2 inline-block text-lg lg:text-xl tracking-widest uppercase">
                    Paket {packageData.name}
                  </span>
                </div>

                {/* Harga */}
                <p className="text-white font-bold text-3xl lg:text-4xl drop-shadow">
                  Rp {packageData.price.toLocaleString("id-ID")}
                </p>

                {/* Deskripsi */}
                <p className="text-yellow-400 uppercase tracking-wider text-sm lg:text-base max-w-md mx-auto font-medium">
                  {packageData.suitable_for}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Purpose Selection */}
        <section className="mt-24 mx-8 font-jost text-black  text-center">
          <h2 className="text-2xl font-bold mb-2">
            Silahkan pilih tujuan pemesananmu
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            Kamu bisa memilih lebih dari 1
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {purposes.map((purpose) => (
              <button
                key={purpose}
                onClick={() => toggleSelection(purpose)}
                className={`px-4 py-2 text-sm rounded border border-primary transition-all ${
                  selected.includes(purpose)
                    ? "bg-primary text-black"
                    : "bg-transparent text-black"
                }`}
              >
                {purpose}
              </button>
            ))}
          </div>
        </section>

        {/* Section: Booking Form */}
        <section className="py-16 px-6 bg-white text-gray-800 font-jost">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-2xl font-bold mb-10">
              Kapan dan di mana photoshootnya?
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Group 1: Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block mb-1 font-semibold">
                    Pilih Tanggal
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border border-yellow-500 rounded p-2 focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Jam</label>
                  {formData.date ? (
                    availableTimes.length > 0 ? (
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full border border-yellow-500 rounded p-2"
                      >
                        {availableTimes.map((time) => (
                          <option key={time} value={time}>
                            {removeSeconds(time)} -{" "}
                            {removeSeconds(calculateEndTime(time))}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-red-500 text-sm">
                        Booking untuk tanggal ini belum tersedia. Silakan pilih
                        tanggal lain.
                      </p>
                    )
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Silakan pilih tanggal terlebih dahulu.
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Durasi</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min={1}
                    className="w-full border border-yellow-500 rounded p-2"
                    disabled
                  />
                </div>
              </div>

              {/* Form Group 2: Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-semibold">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="jhon doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-yellow-500 rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="yogagallery@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-yellow-500 rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">
                    No. Telepon (WA)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="085847******"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-yellow-500 rounded p-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">
                    Lokasi Tujuan
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="pantai sanur"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-yellow-500 rounded p-2"
                  />
                </div>
              </div>

              {/* Submit */}
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 transition"
                >
                  {isSubmitting ? "Memproses..." : "Booking Sekarang"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  );
}
export default function PackageDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params); // Unwrap Promise
  const id = resolvedParams?.id;
  return (
    <>
      <section className="bg-white">
        <Navbar />
        <PackageDetail id={id} />
        <Footer />
      </section>
    </>
  );
}
