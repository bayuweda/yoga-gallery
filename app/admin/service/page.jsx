"use client";

import { useEffect, useState } from "react";

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
    fetch("http://localhost:8000/api/packages")
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
      ? `http://localhost:8000/api/packages/${editId}`
      : "http://localhost:8000/api/packages/store";
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
      fetch(`http://localhost:8000/api/packages/${id}`, {
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
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Nama Paket"
                className="input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Harga"
                className="input"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="duration"
                placeholder="Durasi (jam)"
                className="input"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="total_photos"
                placeholder="Total Foto"
                className="input"
                value={formData.total_photos}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="edited_photos"
                placeholder="Foto Diedit"
                className="input"
                value={formData.edited_photos}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="includes"
                placeholder="Include (contoh: Cetak, Album)"
                className="input"
                value={formData.includes}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="suitable_for"
                placeholder="Cocok Untuk"
                className="input"
                value={formData.suitable_for}
                onChange={handleInputChange}
                required
              />
              <div className="flex justify-end gap-2">
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
