import "./App.css";
import MovieList from "./components/MovieList.js";
import Navbar from "./components/Navbar.js";
import MovieDetails from "./components/MovieDetails.js";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  function handleQuery(q) {
    console.log(q);
    setQuery(q);
  }

  return (
    <div>
      <Navbar onHandleQuery={handleQuery} />
      {/*
      <MovieList query={query} /> */}
      <MovieDetails />
    </div>
  );
}
