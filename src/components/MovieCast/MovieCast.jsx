import { useEffect, useState } from "react";
import { getMovieCredits } from "../../components/api/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import s from "./MovieCast.module.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const [movieCredits, setMovieCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCredits = async () => {
      setIsLoading(true);
      try {
        const dataCredits = await getMovieCredits(movieId);
        setMovieCredits(dataCredits.cast);
      } catch (error) {
        toast.error(`Сталася помилка: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : movieCredits.length === 0 ? (
        <p>No cast information found.</p>
      ) : (
        <ul className={s.cast}>
          {movieCredits.map((credit) => (
            <li key={credit.cast_id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                alt={credit.original_name}
                width={300}
              />
              <p>{credit.original_name}</p>
              <p>{credit.popularity}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
