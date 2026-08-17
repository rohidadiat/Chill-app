import { useState } from "react";
import logo from "../assets/icon/Logo.png";
import { ChevronRight, ChevronDown } from "lucide-react";

const Footer = () => {
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isBantuanOpen, setIsBantuanOpen] = useState(false);

  const genres = [
    ["Aksi", "Anak-anak", "Anime", "Britania"],
    ["Drama", "Fantasi Ilmiah & Fantasi", "Kejahatan", "KDrama"],
    ["Komedi", "Petualangan", "Perang", "Romantis"],
    ["Sains & Alam", "Thriller"],
  ];

  const bantuans = ["FAQ", "Kontak Kami", "Privasi", "Syarat & Ketentuan"];

  return (
    <footer className=" w-full border-t border-gray-700 px-4 md:px-12 py-8">
      <div className="mx-auto md:flex md:justify-between ">
        {/* Logo */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1 text-[25px] font-extrabold tracking-[-1px] text-white">
            <img src={logo} alt="logo" className="h-8" />
          </div>

          <p className="mt-2 text-[9px] text-gray-400">
            ©2023 Chill All Rights Reserved.
          </p>
        </div>

        {/* Genre Dekstop*/}
        <div className="hidden md:block">
          <h4 className="mb-1 text-sm font-semibold text-white">Genre</h4>

          <div className="grid grid-cols-4 gap-6">
            {genres.map((column, index) => (
              <div key={index} className="flex flex-col">
                {column.map((genre) => (
                  <a
                    key={genre}
                    href="#"
                    className="text-[9px] leading-6 text-gray-400 transition hover:text-white"
                  >
                    {genre}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bantuan Dekstop*/}
        <div className="hidden md:flex md:flex-col">
          <h4 className="mb-1 text-sm font-semibold text-white">Bantuan</h4>
          <ul className="grid">
            {bantuans.map((bantuan) => {
              return (
                <li>
                  <a
                    key={bantuan}
                    href="#"
                    className="text-[9px] text-gray-400 transition hover:text-white"
                  >
                    {bantuan}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Button for Mobile*/}

      <div className="md:hidden mt-4 grid gap-4">
        {/* GENRE */}
        <div>
          <button
            className="w-full flex items-center justify-between"
            onClick={() => {
              setIsGenreOpen((prev) => !prev);
              setIsBantuanOpen(false);
            }}
          >
            <span>Genre</span>

            {isGenreOpen ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isGenreOpen
                ? "max-h-96 opacity-100 mt-3"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="ml-4 grid gap-3">
              {genres[0].map((genre) => (
                <a
                  key={genre}
                  href="/"
                  className="text-gray-300 hover:text-white"
                >
                  {genre}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BANTUAN */}
        <div>
          <button
            className="w-full flex items-center justify-between"
            onClick={() => {
              setIsBantuanOpen((prev) => !prev);
              setIsGenreOpen(false);
            }}
          >
            <span>Bantuan</span>

            {isBantuanOpen ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isBantuanOpen
                ? "max-h-96 opacity-100 mt-3"
                : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="ml-4 grid gap-3">
              {bantuans.map((bantuan) => (
                <a
                  key={bantuan}
                  href="/"
                  className="text-gray-300 hover:text-white"
                >
                  {bantuan}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
