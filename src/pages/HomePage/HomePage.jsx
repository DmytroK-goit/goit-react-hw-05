import { lazy, Suspense, useEffect, useState } from "react";
import { fetchTrending } from "../../components/api/api";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrending();
        setMovies(data.results);
      } catch (error) {
        toast.error(`Сталася помилка: ${error.message}`);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div>
      <Suspense>
        <MovieList movies={movies} location={location} />
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default HomePage;
