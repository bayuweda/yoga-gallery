"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
        form
      );

      if (response.status === 201) {
        // Simpan token dan redirect ke halaman dashboard
        localStorage.setItem("token", response.data.token);
        router.push("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <>
      <section className="w-full h-screen py-4 bg-black/55 flex lg:justify-center lg:items-center">
        <div className="lg:w-[60%] px-4 lg:px-0 rounded-md shadow-lg shadow-primary/25 flex flex-wrap ">
          <div className="lg:w-1/2 w-full text-secondary font-bold text-2xl  items-center bg-black rounded-l-md flex justify-center py-4  ">
            <img
              className="w-28  lg:w-56"
              src="/assets/logo-login.png"
              alt=""
            />
          </div>

          <div className="lg:w-1/2 w-full bg-secondary flex flex-col rounded-r-md  items-center  p-6 ">
            <h1 className="text-3xl font-bold text-primary mb-2 ">Register</h1>
            <p className=" text-center mb-4 text-sm">
              Sudah punya akun?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login di sini
              </a>
            </p>
            <div className="w-full">
              {error && <p className="text-red-500">{error}</p>}
              <form onSubmit={handleSubmit} className="">
                <label className="text-sm font-bold" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full mb-3 px-4 py-2 border rounded focus:outline-none  border-primary focus:ring-blue-400"
                  required
                />
                <label className="text-sm font-bold" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full mb-3 px-4 py-2 border rounded focus:outline-none  border-primary focus:ring-blue-400"
                  required
                />
                <label className="text-sm font-bold" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full mb-3 px-4 py-2 border rounded focus:outline-none  border-primary focus:ring-blue-400"
                  required
                />

                <div className="flex gap-4 justify-end">
                  <Link href="/">
                    <button className=" border border-primary text-primary px-4 py-2 rounded">
                      Cancel
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="  bg-primary text-white px-4 py-2 rounded"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
