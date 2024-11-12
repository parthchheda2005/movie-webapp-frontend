import React, { useEffect, useState } from "react";

export default function MovieList({
  query,
  setSelectedMovie,
  ratedMovies,
  showRatedMovies,
  setRatedMovies,
}) {
  const [movieList, setMovieList] = useState(ratedMovies);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {
      setIsLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer " + process.env.API_KEY
                ? process.env.API_KEY
                : "db26278511335a17b88741f4e59cb555",
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
          setMovieList([...new Set(data.results)]);
        }
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    }

    if (!showRatedMovies) {
      getMovies();
    } else {
      setMovieList([...new Set(ratedMovies)]);
    }

    return () => controller.abort();
  }, [query, showRatedMovies, ratedMovies]);

  return (
    <div className="movie-list">
      {!isLoading ? (
        <ul>
          {movieList.map((movie) => {
            return (
              <li key={movie.movieId || movie.id}>
                <MovieCard
                  id={movie.movieId || movie.id}
                  setSelectedMovie={setSelectedMovie}
                  ratedMovies={ratedMovies}
                  setRatedMovies={setRatedMovies}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <h1
          style={{
            fontSize: "100px",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "70px",
          }}
        >
          ❌ NO MOVIES FOUND ❌
        </h1>
      )}
    </div>
  );
}

function MovieCard({ id, setSelectedMovie, ratedMovies, setRatedMovies }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    function getMovieInfo() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer " + process.env.API_KEY
              ? process.env.API_KEY
              : "db26278511335a17b88741f4e59cb555",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((response) => {
          setMovie(response);
        })
        .catch((err) => console.error(err));
    }

    getMovieInfo();

    return () => controller.abort();
  }, [id]);

  const removeMovie = async (movieId) => {
    try {
      const response = await fetch(
        `https://movie-webapp-backend.onrender.com/movies/v1/delete-movie/${movieId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      setRatedMovies((currList) =>
        currList.filter((curr) => curr.movieId * 1 !== movieId * 1)
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="card">
      <img
        className="card-img"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`
            : "https://viterbi-web.usc.edu/~zexunyao/itp301/Assignment_07/img.jpeg"
        }
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
        <button className="card-btn" onClick={() => setSelectedMovie(id)}>
          See Details
        </button>
        {ratedMovies.find((curr) => curr.movieId * 1 === id * 1) && (
          <>
            <p className="card-info">
              <strong>
                You rated this{" "}
                {ratedMovies.find((curr) => curr.movieId * 1 === id * 1).rating}{" "}
                ⭐️
              </strong>
            </p>
            <button className="card-btn" onClick={() => removeMovie(id)}>
              Remove Rating
            </button>
          </>
        )}
      </div>
    </div>
  );
}
