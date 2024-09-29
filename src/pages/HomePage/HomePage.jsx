import React, { useEffect, useState } from "react";
import { fetchTrending } from "../../components/api/api";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <p>{movie.original_title}</p>
            </Link>
          </li>
        ))}
      </ul>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};
export default HomePage;
