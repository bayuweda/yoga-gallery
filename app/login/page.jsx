"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import Modal from "../components/Modal/Modal";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ Tambahkan state loading

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Mulai loading
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.post(`${API_URL}/login`, form);

      Cookies.set("jwt", response.data.access_token, { expires: 7 });
      Cookies.set("role", response.data.role, { expires: 7 });
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setIsSuccessOpen(true);

      setTimeout(() => {
        setIsSuccessOpen(false);
        if (response.data.role === "owner" || response.data.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      setIsErrorOpen(true);
      setTimeout(() => {
        setIsErrorOpen(false);
      }, 2000);
    } finally {
      setIsLoading(false); // ✅ Hentikan loading
    }
  };

  return (
    <section className="w-full h-screen bg-black/55 flex lg:justify-center lg:items-center">
      <div className="lg:w-[60%] px-4 lg:px-0 rounded-md shadow-lg shadow-primary/25 flex flex-wrap">
        <div className="lg:w-1/2 w-full text-secondary font-bold text-2xl items-center bg-black rounded-l-md flex justify-center py-4">
          <img
            className="w-28 lg:w-56"
            src="/assets/logo-login.png"
            alt="Logo"
          />
        </div>

        <div className="lg:w-1/2 w-full bg-secondary flex flex-col rounded-r-md items-center p-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome Back</h1>

          <div className="w-full text-black">
            <form onSubmit={handleSubmit}>
              <label className="text-sm font-bold" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-2 mb-4 border-primary border rounded"
              />
              <label className="text-sm font-bold" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full p-2 mb-4 border border-primary rounded"
              />
              <div className="w-full flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading} // ✅ Disable tombol saat loading
                  className={`px-4 py-2 rounded text-white transition ${
                    isLoading
                      ? "bg-primary/60 cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Success */}
      <Modal
        type="success"
        message="Login successful! Redirecting..."
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />

      {/* Modal Error */}
      <Modal
        type="error"
        message="Login failed. Please check your credentials."
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
      />
    </section>
  );
}
