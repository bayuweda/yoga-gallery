"use client";
import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import Modal from "../Modal/Modal";

const navigation = [
  { name: "BERANDA", href: "/", current: true },
  { name: "LAYANAN", href: "#service", current: false },
  { name: "HARGA", href: "#booking", current: false },
  { name: "GALLERY", href: "/Gallery", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("tes hello");

    const fetchUser = async () => {
      const jwt = Cookies.get("jwt"); // Ambil token dari cookies
      console.log("JWT token from cookies:", jwt); // Cek token yang diambil

      if (!jwt) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${API_URL}/user`, {
          withCredentials: true, // Penting untuk mengirimkan cookies
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data); // Simpan data user
          console.log("User Data:", response.data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsAuthenticated(false);
        setUser(null);
        console.log("Token JWT digunakan:", jwt); // Log token JWT di sini
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Hapus token dari cookies
    Cookies.remove("jwt");

    // Hapus data user jika ada (jika kamu menyimpan data user di cookies juga)
    Cookies.remove("user");

    // Reset status autentikasi dan user
    setIsAuthenticated(false);
    setUser(null);

    setIsSuccessOpen(true);

    setTimeout(() => {
      setIsSuccessOpen(false);
      window.location.reload();
    }, 2000);
  };

  return (
    <Disclosure
      as="nav"
      className={`fixed top-0 left-0 w-full z-50 font-cinzel shadow-md transition-all duration-300 ${
        isScrolled ? "bg-black bg-opacity-90" : "bg-transparent"
      }`}
    >
      <Modal
        type="success"
        message="Logout successful! "
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
      <div className="mx-auto w-full   px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between mx-6">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          <a href="/">
            <div className="flex ml-24 lg:ml-0 shrink-0 gap-2 items-center">
              <img
                alt="Your Company"
                src="/assets/logo.png"
                className="h-8 w-auto"
              />
              <h1 className="text-secondary lg:text-xl font-bold">
                Yoga <span className="text-primary">Gallery</span>
              </h1>
            </div>
          </a>

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className=" hover:bg-primary text-primary text-md hover:text-white
                    rounded-md px-3 py-2 font-extralight"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!isAuthenticated ? (
              <div className="flex lg:gap-4 gap-2 font-bold">
                {/* <Link href="/register">
                  <button className="border-primary font-playfair text-[10px] lg:text-base hover:bg-primary px-2 hover:text-secondary border  py-1 rounded-md  text-primary">
                    Register
                  </button>
                </Link> */}

                <Link href="/login">
                  <button className="border-primary font-playfair text-[10px] lg:text-base hover:bg-primary px-2 hover:text-secondary border  py-1 rounded-md  text-primary">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        onClick={handleLogout}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
                {/* <h1 className="text-white ml-2 font-jost text-base">
                  {user.name}
                </h1> */}
              </div>
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 bg-black  px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className="text-primary hover:bg-gray-700 hover:text-white
                block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
