import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { getMovieDetails, getMovieCredits } from "../../components/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setmovieCredits] = useState([]);
  const [showCast, setShowCast] = useState(false);
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
        setmovieCredits(dataCredits.cast);
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

        {/* Лінк для показу/приховування Cast */}
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault(); // Запобігаємо переходу
            setShowCast((prev) => !prev); // Перемикаємо видимість списку акторів
          }}
        >
          {showCast ? "Hide Cast" : "Show Cast"}
        </Link>
        <Link to={`/movies/${movieId}/reviews`} state={{ from: location }}>
          Reviews
        </Link>

        {/* Умовне рендерення списку акторів */}
        {showCast && movieCredits.length > 0 && (
          <ul>
            {movieCredits.map((credit) => (
              <li key={credit.cast_id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                  alt=""
                  width={200}
                />
                {credit.name} as {credit.character}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
