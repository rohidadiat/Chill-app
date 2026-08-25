import React from "react";
import Nav from "../layout/Nav";
import Footer from "../layout/Footer";
import MovieEmbedded from "../components/MovieEmbedded";
import MovieList from "../components/MovieList";
import { movies } from "../data/movies";

const ContinueWatchingMovies = movies.slice(0, 6);
const TopAndSerriesMovies = movies.slice(5, 14);
const TrandingMovies = movies.slice(8, 16);
const NewReleaseMovies = movies.slice(9, 16);

const Home = () => {
  const movie = {
    title: "Duty After School",
    description:
      "Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.",
    videoId: "kZ5i8NyA4P4",
  };

  return (
    <div className="min-h-screen flex flex-col ">
      <Nav />
      <main className="flex-1 ">
        <MovieEmbedded movie={movie} />
        <div className="grid gap-5 md:px-5">
          {/* Continue Watching Movies Section*/}
          <MovieList movies={ContinueWatchingMovies} mode={"Continue"} />
          {/* Top Film & Serries */}
          <MovieList movies={TopAndSerriesMovies} mode={"Movie"} />
          {/* Trending Film */}
          <MovieList movies={TrandingMovies} mode={"Movie"} />
          {/* New Release */}
          <MovieList movies={NewReleaseMovies} mode={"Movie"} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
