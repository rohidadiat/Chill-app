import React from "react";
import Swal from "sweetalert2";

import Nav from "../layout/Nav";
import Footer from "../layout/Footer";
import MovieList from "/src/components/MovieList";

import { FileUp, Pencil } from "lucide-react";

import profilePng from "/src/assets/icon/profile.png";
import warningPng from "/src/assets/icon/warning.png";
import MovieCard from "../components/MovieCard";

import { movies } from "../data/movies";

const Profile = ({ updateProfile }) => {
  const profile = {
    name: "Rohid Adiat Alma'arij",
    email: "example@gmail.com",
    password: "example",
    profilePhoto: "",
    isPremium: false,
    expiredPremium: "2026-12-31",
    playList: DaftarSaya,
  };

  const MyPlayList = profile.playList.slice(0, 6);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await updateProfile({
        name: formData.get("name"),
        password: formData.get("password"),
      });

      Swal.fire({
        icon: "success",
        title: "Update Profile Berhasil ",
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Profil gagal disimpan.",
        confirmButtonText: "OK",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#181a1b] text-white">
      <Nav />

      <main className="mx-auto w-full px-5 py-8 md:px-8 lg:py-10">
        <div className="grid gap-10 md:grid-cols-[55%_40%] lg:grid-cols-[60%_30%] md:justify-between">
          {/* PROFILE */}
          <div className="order-2 md:order-1">
            <h1 className="mb-6 text-xl font-semibold md:text-2xl">
              Profil Saya
            </h1>
            <div className="mb-5 flex items-center gap-5">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-700 md:h-24 md:w-24">
                <img
                  src={profile?.photo || profilePng}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <button
                  type="button"
                  className="rounded-full border border-blue-600 px-3 py-2 text-sm text-blue-600 hover:bg-blue-500 hover:text-white"
                >
                  Ubah Foto
                </button>

                <p className="mt-2 text-sm text-gray-400 flex gap-1">
                  <FileUp size={16} /> Maksimal 2MB
                </p>
              </div>
            </div>

            {/* FORM PROFILE */}
            <form onSubmit={handleSubmit} className="max-w-full space-y-4">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="pointer-events-none absolute left-3 top-2 text-xs text-gray-400"
                >
                  Nama Pengguna
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={profile?.name || ""}
                  className="h-12 w-full rounded border border-gray-700 bg-gray-600/30 px-3 pb-1 pt-5 pr-10 text-sm text-white outline-none transition focus:border-blue-500"
                  required
                />

                <Pencil
                  size={14}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute left-3 top-2 text-xs text-gray-400"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  readOnly
                  defaultValue={profile?.email || ""}
                  className="h-12 w-full rounded border border-gray-700 bg-gray-700/30 px-3 pb-1 pt-5 text-xs text-gray-400 outline-none"
                  required
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-3 top-2 text-xs text-gray-400"
                >
                  Kata Sandi
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue={profile?.password || ""}
                  placeholder="Masukkan password baru"
                  className="h-12 w-full rounded border border-gray-700 bg-gray-600/30 px-3 pb-1 pt-5 pr-10 text-sm text-gray-300 outline-none transition focus:border-blue-500"
                />

                <Pencil
                  size={14}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                />
              </div>

              <button
                type="submit"
                className="hidden md:block rounded-full bg-[#09147A] px-6 py-2 text-md font-medium transition hover:bg-blue-600"
              >
                Simpan
              </button>
            </form>
          </div>

          {/* SUSCRIBER */}
          <div className="order-1 md:order-2">
            {profile.isPremium && (
              <div className="w-full rounded-md bg-linear-to-r from-[#5370D4] to-[#192DB7] px-6 py-6">
                <span className="py-2 px-4 rounded-full bg-[#C1C2C4] text-blue-900 font-bold">
                  Aktif
                </span>

                <div className="flex-1 mt-4">
                  <h2 className="text-md font-semibold md:text-xl">
                    Akun Premium Individual✨
                  </h2>

                  <p className="mt-1 text-sm leading-relaxed  md:text-md">
                    Saat ini kamu sedang menggunakan akses akun premium
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-md">
                    Berlaku hingga{" "}
                    {new Date(profile.expiredPremium).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>
            )}

            {!profile.isPremium && (
              <div className="w-full rounded-md bg-[#3D4142] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center text-3xl">
                    <img
                      src={warningPng}
                      alt="warning"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-xs font-semibold md:text-sm">
                      Saat ini anda belum berlangganan
                    </h2>

                    <p className="mt-1 text-xs leading-relaxed text-gray-300 md:text-xs">
                      Dapatkan Akses Tak Terbatas ke Ribuan Film dan Series
                      Kesukaan Kamu!
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="whitespace-nowrap rounded-full bg-[#2F3334] px-3 py-1.5 text-xs font-medium hover:bg-gray-700 cursor-pointer"
                  >
                    Mulai Berlangganan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= DAFTAR SAYA ================= */}
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold md:text-xl">Daftar Saya</h2>

            <button className="text-xs hover:text-blue-400">Lihat Semua</button>
          </div>

          {MyPlayList.length > 0 ? (
            <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
              {MyPlayList.map((movie, index) => (
                <div key={`${movie.title}-${index}`} className="w-full min-w-0">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">
              Playlist-mu masih kosong. Yuk, tambahkan film favoritmu!
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
