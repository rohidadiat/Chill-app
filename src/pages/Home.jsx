import React from "react";
import Nav from "../layout/Nav";
import Footer from "../layout/Footer";
import MovieEmbedded from "../components/MovieEmbedded";
import MovieList from "../components/MovieList";
import { movies } from "../data/movies";

import { useAuthStore } from "../store/useAuthStore";

const ContinueWatchingMovies = movies.slice(0, 6);
const TopAndSerriesMovies = movies.slice(5, 14);
const TrandingMovies = movies.filter((item) => item.topTen);
const NewReleaseMovies = movies.filter((item) => item.newEpisode);

const Home = () => {
  const { myplaylist } = useAuthStore();

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
          {myplaylist?.length > 0 && (
            <MovieList
              movies={myplaylist}
              mode="Continue"
              title="Melanjutkan Tontonan Film"
            />
          )}

          {/* Top Film & Serries */}
          <MovieList
            movies={TopAndSerriesMovies}
            mode={"Movie"}
            title={"Top Rating Film dan Series Hari ini"}
          />
          {/* Trending Film */}
          <MovieList
            movies={TrandingMovies}
            mode={"Movie"}
            title={"Film Tranding"}
          />
          {/* New Release */}
          <MovieList
            movies={NewReleaseMovies}
            mode={"Movie"}
            title={"Rilis Baru"}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
