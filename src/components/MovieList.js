import React, { useEffect, useState } from "react";

export default function MovieList({
  query,
  setSelectedMovie,
  ratedMovies,
  showRatedMovies,
  setRatedMovies,
}) {
  const [movieList, setMovieList] = useState(ratedMovies);

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

    if (!showRatedMovies) {
      getMovies();
    } else {
      setMovieList(ratedMovies);
    }

    return () => controller.abort();
  }, [query, showRatedMovies, ratedMovies]);

  return (
    <div className="movie-list">
      {movieList.length > 0 ? (
        <ul>
          {movieList?.map((movie) => (
            <li key={movie.id}>
              <MovieCard
                id={movie.id}
                key={movie.id}
                setSelectedMovie={setSelectedMovie}
                ratedMovies={ratedMovies}
                setRatedMovies={setRatedMovies}
              />
            </li>
          ))}
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
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjI2Mjc4NTExMzM1YTE3Yjg4NzQxZjRlNTljYjU1NSIsInN1YiI6IjY2NGFmNDU2ZWZjYjI3NjdiMDc5OGVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWYIEvar8k8uqdwOxi-okzzE8brzwjUrBApdCptvLMw",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((response) => setMovie(response))
        .catch((err) => console.error(err));
    }

    getMovieInfo();

    return () => controller.abort();
  }, [id]);

  return (
    <div className="card">
      <img
        className="card-img"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`
            : "https://m.media-amazon.com/images/I/71K9jxwdFeL._AC_UF894,1000_QL80_.jpg"
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
        {ratedMovies.find((curr) => curr.id === id) && (
          <p className="card-info">
            {" "}
            You rated this {
              ratedMovies.find((curr) => curr.id === id).rating
            }{" "}
            ⭐️
          </p>
        )}
        {ratedMovies.find((curr) => curr.id === id) && (
          <button
            className="card-btn"
            onClick={() =>
              setRatedMovies((currList) =>
                currList.filter((curr) => curr.id !== id)
              )
            }
          >
            Remove Rating
          </button>
        )}
      </div>
    </div>
  );
}
