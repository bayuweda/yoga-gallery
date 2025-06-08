"use client";

import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ServicePage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: "",
    total_photos: "",
    edited_photos: "",
    includes: "",
    suitable_for: "",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = () => {
    fetch(`${API_URL}/packages`)
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseInt(formData.price),
      duration: parseInt(formData.duration),
      total_photos: parseInt(formData.total_photos),
      edited_photos: parseInt(formData.edited_photos),
      includes: formData.includes.split(",").map((item) => item.trim()),
    };

    const url = isEditing
      ? `${API_URL}/packages/${editId}`
      : `${API_URL}/packages/store`;
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        fetchPackages();
        setShowForm(false);
        setIsEditing(false);
        setEditId(null);
        resetForm();
      })
      .catch((err) => console.error("Submit error:", err));
  };

  const handleEdit = (pkg) => {
    setFormData({
      name: pkg.name,
      price: pkg.price,
      duration: pkg.duration,
      total_photos: pkg.total_photos,
      edited_photos: pkg.edited_photos,
      includes: pkg.includes.join(", "),
      suitable_for: pkg.suitable_for,
    });
    setEditId(pkg.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus paket ini?")) {
      fetch(`${API_URL}/packages/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => fetchPackages())
        .catch((err) => console.error("Delete error:", err));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      duration: "",
      total_photos: "",
      edited_photos: "",
      includes: "",
      suitable_for: "",
    });
  };

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">Manajemen Layanan</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => {
          resetForm();
          setShowForm(true);
          setIsEditing(false);
        }}
      >
        + Tambah Paket
      </button>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Nama Paket</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Durasi</th>
              <th className="px-4 py-2">Total Foto</th>
              <th className="px-4 py-2">Foto Edit</th>
              <th className="px-4 py-2">Cocok Untuk</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-t">
                <td className="px-4 py-2">{pkg.name}</td>
                <td className="px-4 py-2">Rp {pkg.price.toLocaleString()}</td>
                <td className="px-4 py-2">{pkg.duration} jam</td>
                <td className="px-4 py-2">{pkg.total_photos}</td>
                <td className="px-4 py-2">{pkg.edited_photos}</td>
                <td className="px-4 py-2">{pkg.suitable_for}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(pkg)}
                    className="px-3 py-1 bg-yellow-400 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Paket" : "Tambah Paket Baru"}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Nama Paket */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nama Paket
                </label>
                <input
                  type="text"
                  name="name"
                  className="input w-full"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Harga */}
              <div>
                <label className="block text-sm font-medium mb-1">Harga</label>
                <input
                  type="number"
                  name="price"
                  className="input w-full"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Durasi */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Durasi (jam)
                </label>
                <input
                  type="number"
                  name="duration"
                  className="input w-full"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Total Foto */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Total Foto
                </label>
                <input
                  type="number"
                  name="total_photos"
                  className="input w-full"
                  value={formData.total_photos}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Foto Diedit */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Foto Diedit
                </label>
                <input
                  type="number"
                  name="edited_photos"
                  className="input w-full"
                  value={formData.edited_photos}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Include */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Include
                </label>
                <input
                  type="text"
                  name="includes"
                  className="input w-full"
                  value={formData.includes}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Cocok Untuk (full width) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Cocok Untuk
                </label>
                <textarea
                  name="suitable_for"
                  className="input w-full"
                  value={formData.suitable_for}
                  onChange={handleInputChange}
                  required
                  rows={4}
                />
              </div>

              {/* Tombol Aksi */}
              <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                    setIsEditing(false);
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
