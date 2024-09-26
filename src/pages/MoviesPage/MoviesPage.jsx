import React, { useEffect, useState } from "react";
import { surchMovie } from "/Users/dmytro.kovbasiuk/Desktop/HTML/EDU JS/goit-react-hw-05/src/components/api/api";
import { Form } from "react-router-dom";
const MoviesPage = () => {
  const [surchMovies, setSurchMovies] = useState([]);
  const [query, setQuery] = useState("");

  const handleInputChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (query.trim() === "") {
      alert("Please enter a search query");
      return;
    }

    try {
      const data = await surchMovie(query);
      setSurchMovies(data.results);
      console.log(surchMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {surchMovies.length > 0 && (
        <ul>
          {surchMovies.map((movie) => (
            <li key={movie.id}>{movie.overview}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
