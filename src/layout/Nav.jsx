import { useState } from "react";
import logo from "../assets/icon/Logo.png";
import { User, LogOut, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { emailToUsername } from "../services/api";

import { useAuthStore } from "../store/useAuthStore";

const Nav = () => {
  const [isOpen, setisOpen] = useState(false);
  const { user, profile, logout, busy } = useAuthStore();
  const handle = emailToUsername(user?.email);

  return (
    <nav className="left-0 right-0 top-0 z-50">
      <div className="mx-auto flex h-16 bg-black items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-3 md:gap-10">
          <Link
            path="/"
            to="/"
            className="text-xl font-black tracking-tight text-white"
          >
            <img
              src={logo}
              alt="logo"
              className="h-6 w-auto object-contain hidden md:block"
            />
            <img
              src="/Icon.png"
              alt="logo"
              className="h-4 w-auto object-contain block md:hidden"
            />
          </Link>

          <ul className="items-center gap-3 md:gap-8 flex">
            <li>
              <a
                href="#series"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Series
              </a>
            </li>

            <li>
              <a
                href="#film"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Film
              </a>
            </li>

            <li>
              <a
                href="#daftar-saya"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                Daftar Saya
              </a>
            </li>
          </ul>
        </div>

        {/* Profile */}
        <div>
          <button
            onClick={() => setisOpen(!isOpen)}
            className="flex items-center cursor-pointer"
          >
            <div className="flex h-8 w-8 items-center justify-center">
              <span className="text-sm font-bold">
                {profile?.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt="photoProfile"
                    referrerPolicy="no-referrer"
                    className="h-6 md:h-7 w-auto rounded-full object-contain"
                  />
                ) : (
                  <div className="flex w-6 h-6 md:w-7 md:h-7 items-center justify-center rounded-full bg-indigo-100 text-center text-lg leading-none font-semibold text-indigo-700">
                    {(profile?.name || handle || "?").charAt(0).toUpperCase()}
                  </div>
                )}
              </span>
            </div>

            <span className="text-xs text-gray-400">
              <ChevronDown className="h-5" />
            </span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute bg-black text-white right-3 md:right-10 overflow-hidden rounded-b-md shadow-lg p-4 mt-2">
              {/* Profile */}
              <ul className="grid gap-4 ">
                <li>
                  <Link
                    path="/profile"
                    to="/profile"
                    className="flex w-full items-center gap-3 hover:text-blue-500"
                  >
                    <User size={16} />
                    <p className="text-sm">Profile Saya</p>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex w-full items-center gap-3 hover:text-blue-500"
                  >
                    <span className="text-lg">★</span>
                    <p className="text-sm"> Ubah Premium</p>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={logout}
                    disabled={busy}
                    className="flex w-full items-center gap-3 hover:text-blue-500 disabled:opacity-50"
                  >
                    <LogOut size={16} />
                    <p className="text-sm">
                      {busy ? "Memproses..." : "Keluar"}
                    </p>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
