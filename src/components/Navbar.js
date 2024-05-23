import React from "react";
import { useState } from "react";

export default function Navbar({
  onHandleQuery,
  setSelectedMovie,
  setShowRatedMovies,
}) {
  const [tempQuery, setTempQuery] = useState("");
  return (
    <div className="nav-bar">
      <Logo
        onHandleQuery={onHandleQuery}
        setTempQuery={setTempQuery}
        setSelectedMovie={setSelectedMovie}
        setShowRatedMovies={setShowRatedMovies}
      />
      <SearchBar
        onHandleQuery={onHandleQuery}
        tempQuery={tempQuery}
        setTempQuery={setTempQuery}
        setSelectedMovie={setSelectedMovie}
      />
      <button
        className="rated-movies-btn"
        onClick={() => setShowRatedMovies((curr) => !curr)}
      >
        {" "}
        My Rated Movies{" "}
      </button>
    </div>
  );
}

function Logo({
  onHandleQuery,
  setTempQuery,
  setSelectedMovie,
  setShowRatedMovies,
}) {
  function handleClick() {
    onHandleQuery("");
    setTempQuery("");
    setSelectedMovie(false);
    setShowRatedMovies(false);
  }

  return (
    <div className="logo" style={{ cursor: "pointer" }}>
      <h1 onClick={() => handleClick()}>🍿 MyMoviesList 🍿</h1>
    </div>
  );
}

function SearchBar({
  onHandleQuery,
  tempQuery,
  setTempQuery,
  setSelectedMovie,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    setSelectedMovie(false);
    onHandleQuery(tempQuery);
  }

  return (
    <div
      className="search"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="Search..."
          type="text"
          value={tempQuery}
          onChange={(e) => setTempQuery(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}
