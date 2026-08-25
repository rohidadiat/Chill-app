import React, { useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import ContinueWatchingCard from "./ContinueWatchingCard";

const ContinueWatching = ({ movies }) => {
  const sliderRef = useRef(null);

  const getScrollAmount = () => {
    if (!sliderRef.current) return 0;

    const card = sliderRef.current.firstElementChild;

    if (!card) return 0;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 12;

    return cardWidth + gap;
  };

  const handlePrevious = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-6 md:px-10 py-6">
      {/* Title */}
      <h2 className="mb-4 text-lg font-semibold text-white">
        Melanjutkan Tonton Film
      </h2>

      <div className="relative">
        {/* Button arrow left */}
        <button
          onClick={handlePrevious}
          className="
            absolute
            left-[-16px]
            top-1/2
            z-10
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#292d30]
            text-white
            transition
            hover:bg-[#3a3f43]
            cursor-pointer
          "
        >
          <ArrowLeft size={16} />
        </button>

        {/* Carousel */}
        <div
          ref={sliderRef}
          className="
            flex
            gap-3
            overflow-x-auto
            scroll-smooth
            scrollbar-none
          "
        >
          {movies.map((movie, index) => (
            <div
              key={`${movie.title}-${index}`}
              className="
                    w-[calc((100%-10px)/1.15)]
                    min-w-[calc((100%-12px)/1.14)]
                    shrink-0

                    md:w-[calc((100%-24px)/3)]
                    md:min-w-[calc((100%-24px)/3)]

                    lg:w-[calc((100%-36px)/6)]
                    lg:min-w-[calc((100%-36px)/4)]
                "
            >
              <ContinueWatchingCard
                key={`${movie.title}-${index}`}
                movie={movie}
              />
            </div>
          ))}
        </div>

        {/* Button arrow right */}
        <button
          onClick={handleNext}
          className="
            absolute
            right-[-16px]
            top-1/2
            z-10
            flex
            h-8
            w-8
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#292d30]
            text-white
            transition
            hover:bg-[#3a3f43]
            cursor-pointer
          "
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default ContinueWatching;
