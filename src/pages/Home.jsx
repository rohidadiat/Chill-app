import React from "react";
import Nav from "../layout/Nav";
import Footer from "../layout/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <h1>movie</h1>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
