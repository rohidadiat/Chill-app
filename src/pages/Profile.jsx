import Nav from "../layout/Nav";
import Footer from "../layout/Footer";

import { FileUp, Pencil } from "lucide-react";

import MovieCard from "../components/MovieCard";

import warningPng from "/src/assets/icon/warning.png";

import { useAuthStore } from "../store/useAuthStore";
import { emailToUsername } from "../services/api";

import { useProfileForm } from "../hooks/useProfileForm";

const Profile = () => {
  const { user, profile, busy, myplaylist, playlistLoading, playlistError } =
    useAuthStore();

  const {
    name,
    setName,
    password,
    setPassword,
    onSaveProfile,
    saveNameOnBlur,
    savePasswordOnBlur,
  } = useProfileForm();

  const handle = emailToUsername(user?.email);

  return (
    <div className="min-h-screen bg-[#181a1b] text-white">
      <Nav />

      <main className="mx-auto w-full px-5 py-8 md:px-8 lg:py-10">
        <div className="grid gap-10 md:grid-cols-[50%_45%] lg:grid-cols-[35%_25%] md:justify-between">
          {/* PROFILE */}
          <div className="order-2 md:order-1">
            <h1 className="mb-6 text-xl font-semibold md:text-2xl">
              Profil Saya
            </h1>
            <div className="mb-5 flex items-center gap-5">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-700 md:h-24 md:w-24">
                {profile?.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-indigo-100 text-center text-2xl leading-none font-semibold text-indigo-700 md:text-4xl">
                    {(profile?.name || handle || "?").charAt(0).toUpperCase()}
                  </div>
                )}
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
            <form
              onSubmit={onSaveProfile}
              noValidate
              className="max-w-full space-y-4"
            >
              <div className="relative">
                <label
                  htmlFor="name"
                  className="pointer-events-none absolute left-3 top-2 text-xs text-gray-300"
                >
                  Nama Pengguna
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  onBlur={saveNameOnBlur}
                  autoComplete="off"
                  placeholder="nama pengguna . . ."
                  className="h-12 w-full rounded border border-gray-700 bg-gray-600/30 px-3 pb-1 pt-5 pr-10 text-sm text-white outline-none transition focus:border-blue-500"
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
                  className="pointer-events-none absolute left-3 top-2 text-xs text-gray-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  readOnly
                  value={user?.email || ""}
                  className="h-12 w-full rounded border border-gray-700 bg-gray-700/30 px-3 pb-1 pt-5 text-xs text-gray-400 outline-none"
                  required
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute left-3 top-2 text-xs text-gray-300"
                >
                  Kata Sandi
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={savePasswordOnBlur}
                  placeholder="************"
                  autoComplete="new-password"
                  className="h-12 w-full rounded border border-gray-700 bg-gray-600/30 px-3 pb-1 pt-5 pr-10 text-sm text-gray-300 outline-none transition focus:border-blue-500"
                />

                <Pencil
                  size={14}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                />
              </div>

              <button
                type="button"
                disabled={busy}
                onClick={onSaveProfile}
                className="hidden md:block rounded-full bg-[#09147A] px-6 py-2 text-md font-medium transition hover:bg-blue-600 disabled:opacity-50"
              >
                {busy ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </div>

          {/* PREMIUM */}
          <div className="order-1 md:order-2">
            {profile.isPremium &&
              profile?.expiredPremium &&
              new Date(profile.expiredPremium) > new Date() && (
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

            {!profile.isPremium ||
              !profile?.expiredPremium ||
              (new Date(
                profile.expiredPremium.toDate?.() ?? profile.expiredPremium,
              ) <= new Date() && (
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
              ))}
          </div>
        </div>

        {/* ================= DAFTAR SAYA ================= */}
        <section className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold md:text-xl">Daftar Saya</h2>

            <button className="text-xs hover:text-blue-400">Lihat Semua</button>
          </div>

          {playlistLoading ? (
            <p className="mt-4 text-gray-400">Memuat playlist...</p>
          ) : playlistError ? (
            <p className="mt-4 text-red-400">{playlistError}</p>
          ) : myplaylist.length > 0 ? (
            <div className="mt-4 grid grid-cols-3 gap-3 md:grid-cols-6">
              {myplaylist.map((movie) => (
                <div key={movie.playlistId} className="w-full min-w-0">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[30vh] items-center justify-center">
              <p className="text-center text-gray-400">
                Playlist-mu masih kosong. Yuk, tambahkan film favoritmu!
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
