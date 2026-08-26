import React from "react";
import { createPortal } from "react-dom";
import { Play, Check, ChevronDown } from "lucide-react";

const MoviePreview = ({
  movie,
  position,
  onMouseEnter,
  onMouseLeave,
  mode,
}) => {
  if (!movie) return null;

  return createPortal(
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`
        fixed
        z-[9999]
        overflow-hidden
        rounded-lg
        bg-[#181a1c]
        shadow-2xl
        ring-1
        ring-white/10
        transition-opacity
        duration-150
        ${mode === "Movie" ? "md:h-[45vh] lg:h-[52vh]" : ""}
        `}
      style={{
        top: mode == "Movie" ? position.top + 20 : position.top,
        left: mode == "Movie" ? position.left - 10 : position.left,
        width: mode == "Movie" ? position.width + 25 : position.width,
      }}
    >
      {/* IMAGE */}
      <div
        className={`
        relative w-full h-md
        ${mode === "Movie" ? "md:h-[65%] mb-5" : ""}
        `}
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover mb-3"
        />
      </div>

      {/* CONTENT */}
      <div className="px-4 pb-4">
        {/* BUTTONS */}
        <div className="mb-3 flex items-center gap-4">
          <button
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-white
              text-black
              hover:bg-gray-200
              cursor-pointer
            "
          >
            <Play size={14} fill="currentColor" />
          </button>

          <button
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/40
              bg-transparant
              text-white
              hover:bg-white/30
              cursor-pointer
            "
          >
            <Check size={14} />
          </button>

          <button
            className="
              ml-auto
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/40
              bg-transparant
              text-white
              hover:bg-white/30
              cursor-pointer
            "
          >
            <ChevronDown size={15} />
          </button>
        </div>

        {mode === "Movie" && (
          <div className="flex items-center gap-3 mt-4 mb-3 md:my-5">
            <div className="">
              <p className="text-xs font-semibold text-white/70 rounded-full bg-gray-600 px-2 py-1">
                {movie.ageRating}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-white/90">
                {movie.type == "Series" ? movie.episodes : movie.duration}
              </p>
            </div>
          </div>
        )}

        {mode === "Continue" && movie.type != "Film" && (
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-white">
              "{movie.episode}"
            </h3>
          </div>
        )}

        {/* PROGRESS */}
        {mode === "Continue" && (
          <div className="mb-3 flex justify-between items-center w-full text-gray-300">
            <div className="h-1 w-full rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{
                  width: `${movie.progress}%`,
                }}
              />
            </div>

            {movie.duration && (
              <div className="ms-1 text-end w-15 text-xs">
                <span>{movie.duration}</span>
              </div>
            )}
          </div>
        )}

        {/* GENRE */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-300 ">
          {movie.genres.map((genre, index) => (
            <React.Fragment key={genre}>
              <span>{genre}</span>

              {index < movie.genres.length - 1 && (
                <span className="text-gray-500">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default MoviePreview;
