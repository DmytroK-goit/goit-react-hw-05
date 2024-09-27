import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../components/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const dataDetails = await getMovieDetails(movieId);
        setMovieDetails(dataDetails);
      } catch (error) {
        toast.error(`Сталася помилка: ${error.message}`);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <button onClick={() => navigate(from)}>Назад</button>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
        alt=""
      />
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.overview}</p>
      <p>Release date: {movieDetails.release_date}</p>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default MovieDetailsPage;
