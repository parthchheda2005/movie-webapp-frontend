import React, { useState, useEffect } from "react";
import StarRating from "./StarRating.js";

export default function MovieDetails({
  setSelectedMovie,
  selectedMovie,
  setRatedMovies,
  ratedMovies,
}) {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  let movieToBeAdded = { id: selectedMovie, rating: rating };

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
        `https://api.themoviedb.org/3/movie/${selectedMovie}?language=en-US`,
        options,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((response) => setMovie(response))
        .catch((err) => console.error(err));
    }

    getMovieInfo();

    return () => controller.abort();
  }, [selectedMovie]);

  return (
    <div>
      <Content
        movie={movie}
        setSelectedMovie={setSelectedMovie}
        selectedMovie={selectedMovie}
      />
      <RatingSystem
        setRating={setRating}
        setRatedMovies={setRatedMovies}
        movieToBeAdded={movieToBeAdded}
        ratedMovies={ratedMovies}
      />
    </div>
  );
}

function Content({ movie, setSelectedMovie, selectedMovie }) {
  const movieGenres = movie?.genres?.map((obj) => obj.name);

  const [availablity, setAvailability] = useState([]);
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjI2Mjc4NTExMzM1YTE3Yjg4NzQxZjRlNTljYjU1NSIsInN1YiI6IjY2NGFmNDU2ZWZjYjI3NjdiMDc5OGVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWYIEvar8k8uqdwOxi-okzzE8brzwjUrBApdCptvLMw",
      },
    };
    function getAvailability() {
      fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie}/watch/providers`,
        options,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((response) => setAvailability(response.results?.SG?.buy))
        .catch((err) => console.error(err));
    }

    getAvailability();

    return () => controller.abort();
  }, [selectedMovie]);

  useEffect(() => {
    const controller = new AbortController();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjI2Mjc4NTExMzM1YTE3Yjg4NzQxZjRlNTljYjU1NSIsInN1YiI6IjY2NGFmNDU2ZWZjYjI3NjdiMDc5OGVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWYIEvar8k8uqdwOxi-okzzE8brzwjUrBApdCptvLMw",
      },
    };
    function getDirector() {
      fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie}/credits?language=en-US`,
        options,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((response) =>
          setDirector(response.crew.find((obj) => obj.job === "Director").name)
        )
        .catch((err) => console.error(err));
    }

    getDirector();

    return () => controller.abort();
  }, [selectedMovie]);

  useEffect(() => {
    const controller = new AbortController();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjI2Mjc4NTExMzM1YTE3Yjg4NzQxZjRlNTljYjU1NSIsInN1YiI6IjY2NGFmNDU2ZWZjYjI3NjdiMDc5OGVjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWYIEvar8k8uqdwOxi-okzzE8brzwjUrBApdCptvLMw",
      },
    };
    function getActors() {
      fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie}/credits?language=en-US`,
        options,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((response) =>
          setActors(response.cast.filter((obj) => Number(obj.order) < 5))
        )
        .catch((err) => console.error(err));
    }

    getActors();

    return () => controller.abort();
  }, [selectedMovie]);

  return (
    <div className="content">
      <GoBackButton setSelectedMovie={setSelectedMovie} />
      <div className="movie-details">
        <img
          className="movie-img"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie?.poster_path}`
              : "https://m.media-amazon.com/images/I/71K9jxwdFeL._AC_UF894,1000_QL80_.jpg"
          }
          alt={movie.original_title}
        />
        <div className="movie-content">
          <h1>{movie?.title}</h1>
          <h2>
            {movieGenres?.map((genre, acc) =>
              acc === movieGenres.length - 1 ? (
                <span key={acc}>{genre}</span>
              ) : (
                <span key={acc}>{genre}, </span>
              )
            )}
          </h2>
          <h2>{movie?.release_date}</h2>
          <ul>
            <li>
              <p>User Rating: {movie.vote_average}</p>
            </li>
            <li>
              <p>Status: {movie.status}</p>
            </li>
            <li>
              <p>
                Budget: $
                {movie.budget ? (
                  <span>{Number(movie.budget).toLocaleString()}</span>
                ) : (
                  <span>Unknown</span>
                )}
              </p>
            </li>
            <li>
              <p>
                Available in Singapore at:{" "}
                {availablity ? (
                  <span>
                    {availablity?.map((platform, acc) =>
                      acc === availablity.length - 1 ? (
                        <span key={acc}>{platform.provider_name}</span>
                      ) : (
                        <span key={acc}>{platform.provider_name}, </span>
                      )
                    )}
                  </span>
                ) : (
                  <span>Unknown</span>
                )}
              </p>
            </li>
            <li>
              <p>Director: {director}</p>
            </li>
            <li>
              <p>
                Starring:{" "}
                {actors?.map((a, acc) =>
                  acc === actors.length - 1 ? (
                    <span key={acc}>{a.name}</span>
                  ) : (
                    <span key={acc}>{a.name}, </span>
                  )
                )}
              </p>
            </li>
          </ul>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

function RatingSystem({
  setRating,
  movieToBeAdded,
  setRatedMovies,
  ratedMovies,
}) {
  function handleRatedMovies() {
    if (
      ratedMovies.filter((curr) => curr.id === movieToBeAdded.id).length !== 0
    ) {
      setRatedMovies((ratedMovies) =>
        ratedMovies.map((curr) => helperHandleRatedMovies(curr))
      );
    } else {
      setRatedMovies((curr) => [...curr, movieToBeAdded]);
    }
  }

  function helperHandleRatedMovies(curr) {
    if (curr.id === movieToBeAdded.id) {
      return { ...curr, rating: movieToBeAdded.rating };
    }
    return curr;
  }

  return (
    <div className="rating-system">
      <h1>
        {ratedMovies.find((curr) => curr?.id === movieToBeAdded.id) ? (
          <span>
            You have rated this movie{" "}
            {ratedMovies.find((curr) => curr?.id === movieToBeAdded.id)?.rating}
            🌟
          </span>
        ) : (
          "You have not rated this movie yet."
        )}
      </h1>
      <span>
        <StarRating
          className="star-rating"
          maxRating={10}
          color="rgb(141, 10, 248)"
          defualtRating={0}
          onSetRating={setRating}
        />
      </span>
      <button className="rating-button" onClick={() => handleRatedMovies()}>
        Rate the movie!
      </button>
      {ratedMovies.find((curr) => curr.id === movieToBeAdded.id) && (
        <button
          className="rating-button"
          onClick={() =>
            setRatedMovies((currList) =>
              currList.filter((curr) => curr.id !== movieToBeAdded.id)
            )
          }
        >
          Remove Rating
        </button>
      )}
    </div>
  );
}

const GoBackButton = ({ setSelectedMovie }) => {
  return (
    <button
      className="go-back-button"
      title="Go Back"
      onClick={() => setSelectedMovie(false)}
    >
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
