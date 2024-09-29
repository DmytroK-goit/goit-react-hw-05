import React, { useEffect, useState } from "react";
import { searchMovie } from "../../components/api/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import s from "../MoviesPage/MoviesPage.module.css";

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryParam = searchParams.get("query");

    if (queryParam) {
      setQuery(queryParam);
      fetchMovies(queryParam);
    }
  }, [location.search]);

  const handleInputChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (query.trim() === "") {
      toast.info("Пошуковий запит не введений");
      return;
    }

    navigate(`?query=${query}`);
    fetchMovies(query);
  };

  const fetchMovies = async (searchQuery) => {
    try {
      setLoading(true);
      const data = await searchMovie(searchQuery);
      setSearchMovies(data.results);
    } catch (error) {
      toast.error(`Сталася помилка: ${error.message}`);
    } finally {
      setLoading(false);
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

      {loading ? (
        <LoadingSpinner />
      ) : (
        searchMovies.length > 0 && (
          <ul>
            {searchMovies.map((movie) => (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  <p>{movie.original_title}</p>
                </Link>
              </li>
            ))}
          </ul>
        )
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default MoviesPage;
