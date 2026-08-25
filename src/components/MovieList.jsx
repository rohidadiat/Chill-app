import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

import ContinueWatchingCard from "./ContinueWatchingCard";
import MoviePreview from "./MoviePreview";
import MovieCard from "./MovieCard";

const PREVIEW_WIDTH = 300;

const MovieList = ({ movies, mode = "Movie" }) => {
  const sliderRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  const [previewMovie, setPreviewMovie] = useState(null);

  const [previewPosition, setPreviewPosition] = useState({
    top: 0,
    left: 0,
    width: PREVIEW_WIDTH,
  });

  const closePreview = () => {
    clearTimeout(hideTimeoutRef.current);
    setPreviewMovie(null);
  };

  // =========================
  // CLOSE PEV IF SCROLL
  // =========================

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      isScrollingRef.current = true;

      closePreview();

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    const handleWheel = () => {
      isScrollingRef.current = true;

      closePreview();

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, true);

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("wheel", handleWheel);

      clearTimeout(timeout);
    };
  }, []);

  // =========================
  // HIDE PREVIEW
  // =========================

  const hidePreview = () => {
    clearTimeout(hideTimeoutRef.current);

    setPreviewMovie(null);
  };

  // =========================
  // HIDE DENGAN DELAY
  // =========================

  const hidePreviewDelayed = () => {
    clearTimeout(hideTimeoutRef.current);

    hideTimeoutRef.current = setTimeout(() => {
      setPreviewMovie(null);
    }, 120);
  };

  // =========================
  // SHOW PREVIEW
  // =========================

  const handleCardHover = (movie, element) => {
    if (isScrollingRef.current) return;
    clearTimeout(hideTimeoutRef.current);

    const rect = element.getBoundingClientRect();

    let left = rect.left + rect.width / 2 - PREVIEW_WIDTH / 2;

    // Batas kiri
    if (left < 10) {
      left = 10;
    }

    // Batas kanan
    if (left + PREVIEW_WIDTH > window.innerWidth - 10) {
      left = window.innerWidth - PREVIEW_WIDTH - 10;
    }

    let top = rect.top - 60;

    setPreviewPosition({
      top,
      left,
      width: PREVIEW_WIDTH,
    });

    setPreviewMovie(movie);
  };

  // =========================
  // CLEANUP
  // =========================

  useEffect(() => {
    return () => {
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // =========================
  // RESIZE
  // =========================

  useEffect(() => {
    const handleResize = () => {
      setPreviewMovie(null);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // =========================
  // SCROLL AMOUNT
  // =========================

  const getScrollAmount = () => {
    if (!sliderRef.current) return 0;

    const card = sliderRef.current.firstElementChild;

    if (!card) return 0;

    const cardWidth = card.getBoundingClientRect().width;

    return cardWidth + 12;
  };

  const handlePrevious = () => {
    hidePreview();

    sliderRef.current?.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    hidePreview();

    sliderRef.current?.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full px-6 py-6 md:px-10">
      <h2 className="mb-4 text-lg font-semibold text-white">
        Melanjutkan Tonton Film
      </h2>

      <div className="relative">
        {/* LEFT BUTTON */}
        <button
          onClick={handlePrevious}
          className="
            absolute
            left-[-16px]
            top-1/2
            z-20
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

        {/* CAROUSEL */}
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
          {mode == "Continue" &&
            movies.map((movie, index) => (
              <div
                key={`${movie.title}-${index}`}
                className="
                w-[calc((100%-10px)/1.15)]
                min-w-[calc((100%-12px)/1.14)]
                shrink-0

                md:w-[calc((100%-40px)/4)]
                md:min-w-[calc((100%-40px)/4)]
                
                lg:w-[calc((100%-60px)/6)]
                lg:min-w-[calc((100%-60px)/6)]
              "
              >
                <ContinueWatchingCard movie={movie} onHover={handleCardHover} />
              </div>
            ))}

          {mode == "Movie" &&
            movies.map((movie, index) => (
              <div
                key={`${movie.title}-${index}`}
                className="
                w-[calc((100%-10px)/3.15)]
                min-w-[calc((100%-12px)/3.14)]
                shrink-0

                md:w-[calc((100%-48px)/4)]
                md:min-w-[calc((100%-48px)/4)]
                
                lg:w-[calc((100%-60px)/6)]
                lg:min-w-[calc((100%-60px)/6)]
              "
              >
                <MovieCard movie={movie} onHover={handleCardHover} />
              </div>
            ))}
        </div>

        {/* RIGHT BUTTON */}
        <button
          onClick={handleNext}
          className="
            absolute
            right-[-16px]
            top-1/2
            z-20
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

      {/* GLOBAL PREVIEW */}
      {previewMovie && (
        <MoviePreview
          mode={mode}
          movie={previewMovie}
          position={previewPosition}
          onMouseEnter={() => {
            clearTimeout(hideTimeoutRef.current);
          }}
          onMouseLeave={hidePreviewDelayed}
          ContinueWatching={true}
        />
      )}
    </section>
  );
};

export default MovieList;
