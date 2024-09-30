import React, { lazy, Suspense, useEffect, useState } from "react";
import { searchMovie } from "../api/api";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import s from "./MoviesPage.module.css";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleInputChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (query.trim() === "") {
      toast.info("Пошуковий запит не введений");
      return;
    }

    setSearchParams({ query });
    fetchMovies(query);
  };

  const fetchMovies = async (searchQuery) => {
    try {
      setLoading(true);
      const data = await searchMovie(searchQuery);
      if (data.results.length === 0) {
        toast.info("Нічого не знайдено.");
      }
      setSearchMovies(data.results);
    } catch (error) {
      toast.error(`Сталася помилка: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
        />
        <button className={s.btn} type="submit">
          Search
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        searchMovies.length > 0 && (
          <Suspense>
            <MovieList movies={searchMovies} state={{ from: location.state }} />
          </Suspense>
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
