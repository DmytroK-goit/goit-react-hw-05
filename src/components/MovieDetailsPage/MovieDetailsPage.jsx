import React, { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import { getMovieDetails } from "../../components/api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import s from "./MovieDetailsPage.module.css";

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
        setLoading(true);
        const dataDetails = await getMovieDetails(movieId);
        setMovieDetails(dataDetails);
      } catch (error) {
        toast.error(`Сталася помилка: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!movieDetails) {
    return null;
  }

  return (
    <div>
      <div className={s.allinfo}>
        <div className={s.fblock}>
          <Link className={s.btn} to={from}>
            Назад
          </Link>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails.backdrop_path}`}
            alt="Movie poster"
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
          <p className={s.title}>Genres</p>
          <ul className={s.genres}>
            {movieDetails.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.tblock}>
        <p className={s.title}>Additional Information</p>
        <ul className={s.additionalInfo}>
          <li>
            <NavLink
              to="cast"
              className={({ isActive }) => (isActive ? s.activeLink : "")}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to="reviews"
              className={({ isActive }) => (isActive ? s.activeLink : "")}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default MovieDetailsPage;
