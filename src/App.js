import "./App.css";
import MovieList from "./components/MovieList.js";
import Navbar from "./components/Navbar.js";
import MovieDetails from "./components/MovieDetails.js";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [showRatedMovies, setShowRatedMovies] = useState(false);

  function handleQuery(q) {
    ratedMovies.map((i) => console.log(i));
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
