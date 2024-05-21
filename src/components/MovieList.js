import React, { useEffect, useState } from "react";

export default function MovieList({ query }) {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjI2Mjc4NTExMzM1YTE3Yjg4NzQxZjRlNTljYjU1NSIsInN1YiI6IjY2NGFmNDU2ZWZjYjI3NjdiMDc5OGVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWYIEvar8k8uqdwOxi-okzzE8brzwjUrBApdCptvLMw",
          },
        };

        if (!query) {
          const res = await fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
            options,
            { signal: controller.signal }
          );
          const data = await res.json();

          const res2 = await fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
            options,
            { signal: controller.signal }
          );
          const data2 = await res2.json();

          const res3 = await fetch(
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3",
            options,
            { signal: controller.signal }
          );
          const data3 = await res3.json();

          setMovieList(
            data.results.concat(data2.results.concat(data3.results))
          );
        } else {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
            options,
            { signal: controller.signal }
          );
          const data = await res.json();
          setMovieList(data.results);
        }
      } catch (e) {
        console.error(e);
      }
    }

    getMovies();

    return () => controller.abort();
  }, [query]);

  return (
    <div className="movie-list">
      <ul>
        {movieList?.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} key={movie.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <div className="card">
      <img
        className="card-img"
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`}
        alt={movie.original_title}
      />
      <div className="card-body">
        <h1
          className="card-title"
          style={
            movie.title &&
            (movie?.title.length > 40 || movie?.overview.length > 600
              ? { fontSize: "20px" }
              : {})
          }
        >
          {movie.title}
        </h1>
        <p className="card-subtitle">{movie?.release_date}</p>
        <p className="card-info">{movie?.overview}</p>
        <button className="card-btn">See Details</button>
      </div>
    </div>
  );
}
