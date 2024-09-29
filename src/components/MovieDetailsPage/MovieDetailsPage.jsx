import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { getMovieDetails } from "../../components/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReview from "../MovieReviews/MovieReviews";

const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReview, setShowReview] = useState(false);
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

  const toggleShowCast = () => {
    setShowCast((prev) => !prev);
  };
  const toggleShowReview = () => {
    setShowReview((prev) => !prev);
  };
  if (!movieDetails) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className={s.allinfo}>
        <div className={s.fblock}>
          <Link className={s.btn} to={from} state={location}>
            Назад
          </Link>

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
      <div className={s.tblock}>
        <p className={s.title}>Additional Information</p>

        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setShowReview((prev) => !prev);
          }}
        >
          {showReview ? "Hide Reviews" : "Show Reviews"}
        </Link>

        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            setShowCast((prev) => !prev);
          }}
        >
          {showCast ? "Hide Cast" : "Show Cast"}
        </Link>
      </div>

      {showCast && <MovieCast movieId={movieId} />}
      {showReview && <MovieReview movieId={movieId} />}
    </div>
  );
};

export default MovieDetailsPage;
