import { Info, VolumeOff } from "lucide-react";

const MovieEmbedded = ({ movie }) => {
  return (
    <section className="relative h-[30vh] md:h-[calc(100vh-4rem)] overflow-hidden object-cover">
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          className="
          absolute
          left-1/2
          top-1/2
          h-[56.25vw]
          min-h-full
          w-[177.78vh]
          min-w-full
          -translate-x-1/2
          -translate-y-1/2
          scale-100
        "
          src={`https://www.youtube.com/embed/${movie.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${movie.videoId}&playsinline=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#111315] via-[#111315]/70 to-transparent" />

      <div className="w-full h-full relative mt-[8vh] md:mt-110 min-h-screen items-center px-4 md:px-10">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold md:text-5xl">{movie.title}</h1>

          <p className="w-[80vw] md:2-full mt-2 md:mt-5 max-w-lg text-xs leading-6 line-clamp-2 md:line-clamp-5 text-gray-300 md::text-base">
            {movie.description}
          </p>
        </div>
        <div className="flex justify-between items-center mt-4 md:mt-8">
          <ul className=" flex items-center gap-3">
            <li>
              <button className="rounded-full bg-indigo-700 px-4 py-2 text-sm md:text-sm font-semibold text-white transition hover:bg-indigo-500 cursor-pointer">
                Mulai
              </button>
            </li>

            <li>
              <button className="rounded-full bg-[#22282A] px-4 py-2 text-xs md:text-sm font-medium backdrop-blur-md transition hover:bg-white/20 flex gap-2 items-center cursor-pointer">
                <Info size={18} />
                <span>Selengkapnya</span>
              </button>
            </li>

            <li>
              <div className="rounded-full bg-transparent p-2 text-xs border border-gray-500 items-center text-gray-200">
                18+
              </div>
            </li>
          </ul>
          <button className="border rounded-full p-1">
            <VolumeOff size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieEmbedded;
