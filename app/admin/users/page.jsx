"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "owner",
    password: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setCurrentUser(JSON.parse(userData));
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API_URL}/users`);
      if (!res.ok) throw new Error("Gagal memuat data pengguna");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Gagal memuat data pengguna:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewUser({
      name: "",
      email: "",
      role: "owner",
      password: "",
    });
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const method = editingUserId ? "PUT" : "POST";
      const endpoint = editingUserId
        ? `${API_URL}/users/${editingUserId}`
        : `${API_URL}/register`;

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          editingUserId
            ? "User berhasil diperbarui!"
            : "User berhasil ditambahkan!"
        );
        setShowModal(false);
        setEditingUserId(null);
        resetForm();
        fetchUsers();
      } else {
        alert(data.message || "Gagal menyimpan user");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menyimpan user");
    }
  };

  const handleEditUser = (user) => {
    setNewUser({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "owner",
      password: "",
    });
    setEditingUserId(user.id);
    setShowModal(true);
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus user ini?"
    );
    if (!confirmDelete) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User berhasil dihapus");
        fetchUsers();
      } else {
        const data = await response.json();
        alert(data.message || "Gagal menghapus user");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus user");
    }
  };

  const isOwner = currentUser?.role === "owner";

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">Manajemen Pengguna</h2>

      {isOwner && (
        <button
          onClick={() => {
            resetForm();
            setEditingUserId(null);
            setShowModal(true);
          }}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tambah User
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">
              {editingUserId ? "Edit User" : "Tambah User"}
            </h3>

            <form onSubmit={handleSaveUser}>
              {["name", "email", "password"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newUser[field]}
                  onChange={(e) =>
                    setNewUser({ ...newUser, [field]: e.target.value })
                  }
                  className="w-full mb-2 border px-3 py-2 rounded"
                  required={
                    ["name", "email", "password"].includes(field) &&
                    !editingUserId
                  }
                />
              ))}

              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full mb-2 border px-3 py-2 rounded"
              >
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <p>Memuat data pengguna...</p>
      ) : (
        <table className="w-full table-auto border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              {isOwner && <th className="px-6 py-3 text-left">Aksi</th>}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                {isOwner && (
                  <td className="px-6 py-4 space-x-4">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
