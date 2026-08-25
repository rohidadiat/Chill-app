import React from "react";

const MovieCard = ({ movie, onHover }) => {
  return (
    <div
      onMouseEnter={(e) => onHover(movie, e.currentTarget)}
      className="
        group
        relative
        h-[30vh]
        md:h-80
        lg:h-100
        w-full
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
          transition-transform
          duration-300
          group-hover:scale-105
        "
      />

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
            text-xs
            text-white
          "
        >
          Episode Baru
        </span>
      )}

      {movie.topTen && (
        <span
          className=" 
            text-wrap
            w-8
            absolute
            right-2
            top-0
            rounded-tr
            rounded-bl
            bg-red-700
            px-2
            py-1
            text-xs
            text-white
          "
        >
          Top 10
        </span>
      )}
    </div>
  );
};

export default MovieCard;
