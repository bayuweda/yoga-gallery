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

  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const purposes = [
    "Engagement",
    "Business event",
    "Wedding",
    "Birthday",
    "Maternity",
    "Graduation",
    "Product",
    "Honeymoon",
    "Fashion",
    "Anniversary",
    "Food",
    "Conference",
    "Team and workspace",
    "Personal Portrait",
    "Family",
    "Travel shoot",
    "Baby",
    "Others",
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

  const calculateEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    let endHours = hours + 1;
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

  if (!packageData)
    return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <>
      <section className="mt-24 font-cinzel">
        <div className="relative p-5 bg-[url('/assets/bg-packagedetail.png')] bg-cover bg-center w-full h-[400px]">
          <div className="absolute inset-0 backdrop-blur-lg p-10 bg-black/40"></div>
          <div className="relative z-10 border h-full border-primary">
            <div className="p-4 text-center">
              <h1 className="lg:text-3xl font-cinzel mb-14 text-primary font-bold">
                HALLO SELAMAT DATANG DI HALAMAN BOOKING
              </h1>
              <div className="flex flex-col justify-center gap-4">
                <h1 className="uppercase border text-center mx-auto border-primary text-primary text-2xl w-64">
                  PAKET {packageData.name}
                </h1>
                <h1 className="text-secondary font-bold font-jost text-xl">
                  Rp {packageData.price.toLocaleString("id-ID")}
                </h1>
                <h2 className="text-yellow-500 uppercase lg:text-xl lg:w-96 px-2 mx-auto">
                  {packageData.suitable_for}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 lg:mx-6 font-jost flex flex-col items-center justify-center bg-black text-white p-4">
          <h1 className="text-xl font-bold mb-2">
            SILAHKAN PILIH TUJUAN PEMESANANMU
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            kamu bisa memilih lebih dari 1
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {purposes.map((purpose) => (
              <button
                key={purpose}
                onClick={() => toggleSelection(purpose)}
                className={`lg:px-4 lg:py-2 text-[10px] lg:text-sm px-2 py-1 rounded border border-primary transition-all 
          ${
            selected.includes(purpose)
              ? "bg-primary text-secondary"
              : "bg-transparent text-secondary"
          }`}
              >
                {purpose}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-screen flex flex-col items-center justify-center p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full text-secondary font-jost max-w-3xl space-y-6"
          >
            <div>
              <h2 className="text-xl font-semibold text-center mb-4">
                When and where is the photoshoot?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border text-gray-700 border-yellow-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="text-gray-700">
                  {availableTimes.length > 0 ? (
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
                    >
                      <option value="">Pilih Jam</option>
                      {availableTimes.map((startTime, index) => {
                        const endTime = calculateEndTime(startTime);
                        return (
                          <option
                            className="text-gray-700"
                            key={index}
                            value={`${startTime}-${endTime}`}
                          >
                            {`${removeSeconds(startTime)} - ${removeSeconds(
                              endTime
                            )}`}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <p className="text-sm text-red-500 mt-2">
                      Tidak ada jam yang tersedia untuk tanggal ini.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter the location address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border mb-28 border-yellow-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-center mb-4">
                Kindly provide your contact details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-yellow-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-yellow-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-yellow-500 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
    // <div className="container mx-auto mt-8 p-4 lg:p-8 bg-white shadow-lg rounded-2xl">
    //   {/* Package Detail */}
    //   <div className="mb-8">
    //     <h1 className="text-4xl font-extrabold text-primary">
    //       {packageData.name}
    //     </h1>
    //     <p className="text-lg text-gray-600 mt-4">
    //       Harga:{" "}
    //       <span className="font-semibold text-green-600">
    //         Rp {packageData.price.toLocaleString("id-ID")}
    //       </span>
    //     </p>
    //     <p className="text-sm text-gray-500 mt-2">
    //       Durasi: {packageData.duration}
    //     </p>
    //     <p className="text-sm text-gray-500 mt-2">
    //       Jumlah Foto: {packageData.total_photos} (edit{" "}
    //       {packageData.edited_photos})
    //     </p>
    //     <ul className="mt-4 text-sm text-gray-600 list-disc pl-5">
    //       {Array.isArray(JSON.parse(packageData.includes)) &&
    //         JSON.parse(packageData.includes).map((item, index) => (
    //           <li key={index}>{item}</li>
    //         ))}
    //     </ul>
    //     <p className="mt-4 font-bold text-sm text-primary">Cocok untuk:</p>
    //     <h2 className="text-gray-700 text-sm">{packageData.suitable_for}</h2>
    //   </div>

    //   {/* Booking Form */}
    //   <div className="border-t-2 pt-6">
    //     <h2 className="text-2xl font-bold text-primary mb-4">Form Booking</h2>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Nama
    //         </label>
    //         <input
    //           type="text"
    //           name="name"
    //           value={formData.name}
    //           onChange={handleChange}
    //           className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
    //           placeholder="Masukkan nama lengkap"
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
    //           placeholder="Masukkan email aktif"
    //         />
    //       </div>

    //       <div>
    //         <label className="block text-sm font-medium text-gray-700">
    //           Tanggal
    //         </label>
    //         <input
    //           type="date"
    //           name="date"
    //           value={formData.date}
    //           onChange={handleChange}
    //           className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
    //         />
    //       </div>

    //       {/* Available Times Dropdown */}
    //       {formData.date && (
    //         <div>
    //           <label className="block text-sm font-medium text-gray-700">
    //             Jam
    //           </label>
    //           {availableTimes.length > 0 ? (
    //             <select
    //               name="time"
    //               value={formData.time}
    //               onChange={handleChange}
    //               className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:ring-primary focus:border-primary p-2"
    //             >
    //               <option value="">Pilih Jam</option>
    //               {availableTimes.map((time, index) => (
    //                 <option key={index} value={time}>
    //                   {time}
    //                 </option>
    //               ))}
    //             </select>
    //           ) : (
    //             <p className="text-sm text-red-500 mt-2">
    //               Tidak ada jam yang tersedia untuk tanggal ini.
    //             </p>
    //           )}
    //         </div>
    //       )}

    //       {error && <p className="text-red-500 text-sm">{error}</p>}

    //       <button
    //         type="submit"
    //         className={`w-full py-3 rounded-xl text-white font-bold transition-transform transform ${
    //           isSubmitting
    //             ? "bg-gray-400 cursor-not-allowed"
    //             : "bg-primary hover:bg-primary-dark hover:scale-105"
    //         }`}
    //         disabled={isSubmitting}
    //       >
    //         {isSubmitting ? "Memproses..." : "Booking Sekarang"}
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}

export default function PackageDetailPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params); // Unwrap Promise
  const id = resolvedParams?.id;
  return (
    <>
      <Navbar />
      <PackageDetail id={id} />
      <Footer />
    </>
  );
}
