import "./App.css";
import MovieList from "./components/MovieList.js";
import Navbar from "./components/Navbar.js";
import MovieDetails from "./components/MovieDetails.js";
import { useState, useEffect } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(false);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [showRatedMovies, setShowRatedMovies] = useState(false);

  useEffect(() => {
    const getRatedMovies = async () => {
      try {
        const res = await fetch(
          "https://movie-webapp-backend.onrender.com/movies/v1/get-movies"
        );
        const data = await res.json();
        setRatedMovies(data.data.movies);
        console.log(data.data.movies);
      } catch (e) {
        console.error(e);
      }
    };
    getRatedMovies();
  }, []);

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
