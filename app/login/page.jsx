"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await axios.post(`${API_URL}/login`, form);
      console.log("data response", response);

      // Simpan token ke cookies
      Cookies.set("jwt", response.data.access_token, { expires: 7 });

      // Arahkan ke halaman utama
      router.push("/");
    } catch (error) {
      setError("Login gagal. Cek email dan password.");
    }
  };

  return (
    <section className="w-full h-screen bg-secondary flex justify-center items-center">
      <div className="w-[60%] rounded-md shadow-lg  flex ">
        <div className="w-1/2 text-secondary font-bold text-2xl flex-col items-center bg-black rounded-l-md flex justify-center py-4  ">
          <img className="" src="/assets/logo-login.png" alt="" />
        </div>

        <div className="w-1/2 bg-secondary flex flex-col rounded-r-md  items-center  p-6 ">
          <h1 className="text-3xl font-bold text-primary mb-2 ">
            Welcome Back
          </h1>
          <h3 className="mb-14 text-sm text-black/40 font-light">
            New Here?{" "}
            <Link href="/register">
              <strong className="text-primary text-sm">
                Create an account
              </strong>
            </Link>
          </h3>
          <div className="w-full">
            {error && <p className="text-red-500">{error}</p>}
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
                  className="  bg-primary text-white px-4 py-2 rounded"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
