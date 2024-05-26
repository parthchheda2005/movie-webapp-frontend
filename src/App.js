import "./App.css";
import MovieList from "./components/MovieList.js";
import Navbar from "./components/Navbar.js";
import MovieDetails from "./components/MovieDetails.js";
import { useState, useEffect } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [ratedMovies, setRatedMovies] = useState(function () {
    const storedValue = localStorage.getItem("ratedMovies");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [showRatedMovies, setShowRatedMovies] = useState(false);

  useEffect(() => {
    localStorage.setItem("ratedMovies", JSON.stringify(ratedMovies));
  }, [ratedMovies]);

  function handleQuery(q) {
    setQuery(q);
  }

  return (
    <div>
      <Navbar
        onHandleQuery={handleQuery}
        setSelectedMovie={setSelectedMovie}
        setShowRatedMovies={setShowRatedMovies}
      />
      {selectedMovie ? (
        <MovieDetails
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          setRatedMovies={setRatedMovies}
          ratedMovies={ratedMovies}
        />
      ) : (
        <MovieList
          query={query}
          setSelectedMovie={setSelectedMovie}
          showRatedMovies={showRatedMovies}
          ratedMovies={ratedMovies}
          setRatedMovies={setRatedMovies}
        />
      )}
    </div>
  );
}
