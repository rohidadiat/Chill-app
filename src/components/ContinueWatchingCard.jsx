import React from "react";

const ContinueWatchingCard = ({ movie, onHover }) => {
  return (
    <div
      onMouseEnter={(e) => onHover(movie, e.currentTarget)}
      className="
        group
        relative
        h-[15vh]
        md:h-30
        lg:h-40
        w-full
        overflow-hidden
        rounded-md
        bg-gray-800
      "
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-transform
          duration-300
          group-hover:scale-105
        "
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent" />

      {movie.newEpisode && (
        <span
          className="
            absolute
            left-2
            top-2
            rounded-full
            bg-blue-900
            px-2
            py-1
            text-[9px]
            text-white
          "
        >
          Episode Baru
        </span>
      )}

      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
        <span className="truncate text-[10px] text-white">{movie.title}</span>

        <span className="ml-2 shrink-0 text-[9px] text-white/80">
          ★ {movie.rating}
        </span>
      </div>
    </div>
  );
};

export default ContinueWatchingCard;
