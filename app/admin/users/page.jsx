"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data pengguna:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="text-black">
      <h2 className="text-xl font-bold mb-4">Manajemen Pengguna</h2>
      {loading ? (
        <p>Memuat data pengguna...</p>
      ) : (
        <table className="w-full table-auto border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Alamat</th>
              <th className="px-6 py-3 text-left">Tanggal Lahir</th>
              <th className="px-6 py-3 text-left">No Telepon</th>
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
                <td className="px-6 py-4">{user.address || "-"}</td>
                <td className="px-6 py-4">{user.birthdate || "-"}</td>
                <td className="px-6 py-4">{user.phone || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
