import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../../components/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setmovieCredits] = useState(null);
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

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const dataCredits = await getMovieCredits(movieId);
        setmovieCredits(dataCredits);
        console.log(dataCredits);
      } catch (error) {
        toast.error(`Сталася помилка: ${error.message}`);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  if (!movieDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className={s.allinfo}>
        <div className={s.fblock}>
          <button onClick={() => navigate(from)}>Назад</button>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
            alt=""
            width={400}
          />
        </div>
        <div className={s.sblock}>
          <h2>{movieDetails.title}</h2>
          <p className={s.title}>Homepage</p>
          <p>{movieDetails.homepage}</p>
          <p>{`UserScore: ${movieDetails.vote_average * 10}%`}</p>
          <p className={s.title}>Overview</p>
          <p>{movieDetails.overview}</p>
          <p className={s.title}>Ganres</p>
          <ul className={s.ganres}>
            {movieDetails.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>{" "}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
      </div>
      <p className={s.title}>Additional Information</p>
    </div>
  );
};

export default MovieDetailsPage;
