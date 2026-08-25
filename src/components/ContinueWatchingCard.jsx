import React from "react";
import { Play, Check, ChevronDown } from "lucide-react";

const ContinueWatchingCard = ({ movie }) => {
  return (
    <div
      className="
        group
        relative
        h-[15vh] 
        md:h-[20vh]
        min-w-0
        flex-1
        overflow-hidden
        rounded-md
        bg-gray-800
      "
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition
          duration-300
          group-hover:scale-105
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />

      {/* Episode Baru */}
      {movie.newEpisode && (
        <span
          className="
            absolute
            right-0
            top-0
            rounded-bl
            bg-blue-600
            px-2
            py-1
            text-[9px]
            text-white
          "
        >
          Episode Baru
        </span>
      )}

      {/* Info */}
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
