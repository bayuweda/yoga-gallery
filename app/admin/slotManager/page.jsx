"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const SlotManager = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    async function fetchSlots() {
      try {
        const response = await fetch(
          `${API_URL}/admin/appointments${
            selectedDate ? `?date=${selectedDate}` : ""
          }`
        );
        const data = await response.json();
        setSlots(data);
      } catch (error) {
        console.error("Gagal mengambil slot:", error);
      }
    }

    fetchSlots();
  }, [selectedDate]);

  const handleAddSlot = async () => {
    if (!date || !time) return alert("Tanggal dan waktu harus diisi");

    try {
      const response = await fetch(`${API_URL}/admin/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, start_time: time }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Gagal menambahkan slot");

      alert("Slot berhasil ditambahkan!");
      setDate("");
      setTime("");
      setSelectedDate(date); // refresh data
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteSlot = async (id) => {
    if (!window.confirm("Yakin ingin menghapus slot ini?")) return;

    try {
      const response = await fetch(`${API_URL}/admin/appointments/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Gagal menghapus slot");

      alert("Slot berhasil dihapus");
      setSelectedDate(selectedDate); // refresh data
    } catch (error) {
      alert(error.message);
    }
  };

  const formatDate = (isoDateStr) => {
    const tanggal = new Date(isoDateStr);
    return tanggal.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const isSlotExpired = (date, time) => {
    const slotDateTime = new Date(`${date}T${time}`);
    return slotDateTime < new Date();
  };

  const handleGenerateWeekly = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/appointments/generate-weekly`, {
        method: "POST",
      });

      const data = await res.json();
      alert(data.message || "Slot berhasil digenerate!");
      setSelectedDate(""); // Refresh semua
    } catch (err) {
      console.error("Gagal generate:", err);
      alert("Gagal generate slot mingguan.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Manajemen Jadwal Fotografer</h2>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manajemen Jadwal Fotografer</h2>
        <button
          onClick={handleGenerateWeekly}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Slot Mingguan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={handleAddSlot}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Tambah Slot
        </button>
      </div>

      <div>
        <label className="block mt-4 mb-2">Filter berdasarkan tanggal:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>

      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Tanggal</th>
            <th className="p-2">Jam Mulai</th>
            <th className="p-2">Status</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {slots.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Tidak ada slot untuk tanggal ini
              </td>
            </tr>
          ) : (
            slots.map((slot) => {
              const expired = isSlotExpired(slot.date, slot.start_time);
              return (
                <tr key={slot.id} className="border-t">
                  <td className="p-2">{formatDate(slot.date)}</td>
                  <td className="p-2">{slot.start_time}</td>
                  <td className="p-2">
                    {expired ? (
                      <span className="text-gray-500">Kadaluwarsa</span>
                    ) : slot.is_booked ? (
                      <span className="text-red-600">
                        Sudah dibooking oleh {slot.booking?.name || "pengguna"}
                        <div className="text-sm text-gray-600">
                          {slot.booking?.phone && `📱 ${slot.booking.phone}`}{" "}
                          <br />
                          {slot.booking?.package_id &&
                            `📦 Paket: ${slot.booking.package_id}`}
                        </div>
                      </span>
                    ) : (
                      <span className="text-green-600">Tersedia</span>
                    )}
                  </td>
                  <td className="p-2">
                    {!slot.is_booked && !expired && (
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SlotManager;
