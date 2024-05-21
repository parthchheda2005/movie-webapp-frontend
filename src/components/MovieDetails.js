import React from "react";
import { useState, useEffect } from "react";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const controller = new AbortController();

    function getMovieInfo() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjI2Mjc4NTExMzM1YTE3Yjg4NzQxZjRlNTljYjU1NSIsInN1YiI6IjY2NGFmNDU2ZWZjYjI3NjdiMDc5OGVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWYIEvar8k8uqdwOxi-okzzE8brzwjUrBApdCptvLMw",
        },
      };

      fetch(
        "https://api.themoviedb.org/3/movie/823464?language=en-US",
        options,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((response) => setMovie(response))
        .catch((err) => console.error(err));
    }

    getMovieInfo();

    return () => controller.abort();
  });
  return (
    <div>
      <GoBackButton />
      <Content movie={movie} />
    </div>
  );
}

function Content({ movie }) {
  const [movieGenres, setMovieGenre] = useState(
    movie.genres ? Object.values(movie.genres).map((genre) => genre.name) : []
  );

  return (
    <div className="movie-details">
      <img
        className="movie-img"
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}
        alt={movie.original_title}
        onClick={() => console.log(typeof movieGenres)}
      />
      <div className="movie-content">
        <h1>{movie?.title}</h1>
        <h2>{movie?.release_date}</h2>
        <h2>
          {movieGenres.map((genre, acc) =>
            acc === movieGenres.length - 1 ? (
              <span>{genre}</span>
            ) : (
              <span>{genre}, </span>
            )
          )}
        </h2>
      </div>
    </div>
  );
}

const GoBackButton = () => {
  return (
    <button className="go-back-button" title="Go Back">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        className="icon"
      >
        <path
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M11 6L5 12M5 12L11 18M5 12H19"
        ></path>
      </svg>
    </button>
  );
};
