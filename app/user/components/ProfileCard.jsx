"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function ProfileCard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = Cookies.get("jwt");

      if (token) {
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
          const response = await axios.get(`${API_URL}/user-profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProfile(response.data); // Menyimpan data profile ke state
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-red-500">
        <p>Profile not found or failed to load.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Profile Saya</h2>
      <div className="flex items-center space-x-4">
        <img
          src={profile.photo || "/assets/default-profile.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-medium">{profile.name}</h3>
          <p className="text-gray-500">{profile.email}</p>
        </div>
      </div>
    </div>
  );
}
