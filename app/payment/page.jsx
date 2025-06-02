"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PembayaranPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [total, setTotal] = useState(null);
  const [packageName, setPackageName] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const totalParam = searchParams.get("total");
    const packageParam = searchParams.get("package");
    const nameParam = searchParams.get("name");
    const addressParam = searchParams.get("address");
    const phoneParam = searchParams.get("phone");

    if (totalParam && packageParam) {
      setTotal(Number(totalParam));
      setPackageName(packageParam);
    }

    setUserData({
      name: nameParam || "Tidak Ditemukan",
      address: addressParam || "Tidak Ditemukan",
      phone: phoneParam || "Tidak Ditemukan",
    });
  }, [searchParams]);

  if (!total || !packageName) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <p className="text-gray-600 text-center">
          Data pembayaran tidak ditemukan.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-3 text-gray-800">Terima Kasih!</h1>
        <p className="mb-5 text-gray-600">
          Pesanan Anda berhasil dibuat. Silakan lakukan pembayaran dengan
          rincian berikut:
        </p>

        {/* Detail Pengguna */}
        <div className="text-left mb-6 space-y-3">
          <div>
            <span className="block text-sm text-gray-500">Nama:</span>
            <p className="font-medium text-gray-800">{userData.name}</p>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Alamat:</span>
            <p className="font-medium text-gray-800">{userData.address}</p>
          </div>
          <div>
            <span className="block text-sm text-gray-500">Nomor Telepon:</span>
            <p className="font-medium text-gray-800">{userData.phone}</p>
          </div>
        </div>

        {/* Detail Pemesanan */}
        <div className="text-left mb-6 space-y-3">
          <div>
            <span className="block text-sm text-gray-500">Paket:</span>
            <p className="font-medium text-gray-800">{packageName}</p>
          </div>
          <div>
            <span className="block text-sm text-gray-500">
              Total Pembayaran:
            </span>
            <p className="text-lg font-bold text-green-600">
              Rp {total.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Instruksi Pembayaran */}
        <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl mb-6">
          <p className="font-semibold mb-2 text-gray-700">
            Transfer ke rekening berikut:
          </p>
          <p className="text-lg font-bold text-gray-800">BCA 1234567890</p>
          <p className="text-sm text-gray-600">a.n. I KETUT YOGA MAHARDIKA</p>
        </div>

        <p className="mb-6 text-gray-600 text-sm">
          Setelah melakukan pembayaran, silakan konfirmasi melalui{" "}
          <a
            href={`https://wa.me/6281234567890?text=Halo%20admin%2C%20saya%20${encodeURIComponent(
              userData.name
            )}%20sudah%20transfer%20untuk%20paket%20${encodeURIComponent(
              packageName
            )}%20sebesar%20Rp%20${total.toLocaleString("id-ID")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 font-semibold hover:underline"
          >
            WhatsApp Admin
          </a>
          .
        </p>

        <button
          onClick={() => router.push("/")}
          className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all"
        >
          Kembali ke Beranda
        </button>
      </div>
    </main>
  );
}
