"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const SlotCalendar = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Kalender Slot Booking</h2>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={async (fetchInfo, successCallback, failureCallback) => {
          try {
            const res = await fetch(
              `${API_URL}/admin/appointments?start=${fetchInfo.startStr}&end=${fetchInfo.endStr}`
            );
            const data = await res.json();
            console.log("API response data:", data);

            const formattedEvents = data.map((slot) => {
              const dateOnly = slot.date.split("T")[0]; // Ambil tanggal saja
              const isBooked = slot.is_booked;
              const isExpired =
                new Date(`${dateOnly}T${slot.start_time}`) < new Date();

              return {
                id: slot.id,
                title: isExpired
                  ? "⏰ Kadaluwarsa"
                  : isBooked
                  ? `📌 Booked: ${slot.booking?.name || "pengguna"}`
                  : "✅ Tersedia",
                start: `${dateOnly}T${slot.start_time}`,
                color: isExpired ? "#9CA3AF" : isBooked ? "#DC2626" : "#16A34A",
              };
            });

            successCallback(formattedEvents);
          } catch (err) {
            console.error("Gagal mengambil slot:", err);
            failureCallback(err);
          }
        }}
        height="auto"
      />
    </div>
  );
};

export default SlotCalendar;
