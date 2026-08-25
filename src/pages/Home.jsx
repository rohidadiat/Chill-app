import React from "react";
import Nav from "../layout/Nav";
import Footer from "../layout/Footer";
import MovieEmbedded from "../components/MovieEmbedded";
import MovieList from "../components/ContinueWatching";
import { movies } from "../data/movies";

const Home = () => {
  const movie = {
    title: "Duty After School",
    description:
      "Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.",
    videoId: "kZ5i8NyA4P4",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className=" flex-1 ">
        <MovieEmbedded movie={movie} />
        <MovieList movies={movies} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
