import { lazy, Suspense, useEffect, useState } from "react";
import { searchMovie } from "../api/api";
import { useLocation, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const MoviesPage = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const location = useLocation();

  useEffect(() => {
    const savedQuery = searchParams.get("query");
    if (savedQuery) {
      fetchMovies(savedQuery);
    }
  }, [searchParams]);

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
    <div className="mt-10">
      <form className="flex flex-col items-center " onSubmit={handleSubmit}>
        <input
          className="w-3/4 sm:w-4/5 lg:w-3/5 p-2 mb-4 border border-gray-300 rounded"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleInputChange}
        />
        <button
          className="w-1/3 sm:w-1/4 lg:w-1/5 p-2 bg-blue-500 text-white rounded transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-500 "
          type="submit"
        >
          Search
        </button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Suspense>
          <MovieList movies={searchMovies} location={location} />
        </Suspense>
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
