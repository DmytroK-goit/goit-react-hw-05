import React, { useEffect, useState } from "react";
import { surchMovie } from "/Users/dmytro.kovbasiuk/Desktop/HTML/EDU JS/goit-react-hw-05/src/components/api/api";
import Movies from "/Users/dmytro.kovbasiuk/Desktop/HTML/EDU JS/goit-react-hw-05/src/components/Movies/Movies";
import { useNavigate, Link } from "react-router-dom";
const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate;

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
      setSearchMovies(data.results);
      console.log(searchMovies);
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

      {searchMovies.length > 0 && (
        <ul>
          {searchMovies.map((movie) => (
            <li key={movie.id}>
              <Link to={movie.id.toString()}>
                <p>{movie.original_title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
