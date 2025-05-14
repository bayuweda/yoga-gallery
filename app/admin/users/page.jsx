"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "owner", // langsung set ke 'owner'
    address: "",
    birthdate: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Gagal memuat data pengguna:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (response.ok) {
        alert("User berhasil ditambahkan!");
        setShowModal(false);
        setNewUser({
          name: "",
          email: "",
          role: "owner", // tetap owner
          address: "",
          birthdate: "",
          phone: "",
          password: "",
        });
        fetchUsers();
      } else {
        alert(data.message || "Gagal menambahkan user");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menambahkan user");
    }
  };

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">Manajemen Pengguna</h2>

      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Tambah User
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Tambah User</h3>

            <form onSubmit={handleAddUser}>
              {/* Input fields */}
              {[
                "name",
                "email",
                "password",
                "address",
                "birthdate",
                "phone",
              ].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={newUser[field]}
                  onChange={(e) =>
                    setNewUser({ ...newUser, [field]: e.target.value })
                  }
                  className="w-full mb-2 border px-3 py-2 rounded"
                  required={["name", "email", "password"].includes(field)}
                />
              ))}

              {/* Hidden input untuk role */}
              <input type="hidden" value="owner" />

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
              <th className="px-6 py-3 text-left">Alamat</th>
              <th className="px-6 py-3 text-left">Tanggal Lahir</th>
              <th className="px-6 py-3 text-left">No Telepon</th>
              <th className="px-6 py-3 text-left">Role</th>
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
                <td className="px-6 py-4">{user.address || "-"}</td>
                <td className="px-6 py-4">{user.birthdate || "-"}</td>
                <td className="px-6 py-4">{user.phone || "-"}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
