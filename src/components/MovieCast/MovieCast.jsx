import { useEffect, useState } from "react";
import { getMovieCredits } from "../../components/api/api";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import s from "./MovieCast.module.css";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

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
        console.log(dataCredits);
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
        <ul className="grid gap-8 justify-between content-center sm:grid-cols-1 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {movieCredits.map((credit) => (
            <li
              className="max-w-[250px] xs:max-w-[400px] cursor-pointer p-5 rounded-3xl shadow-lg bg-emerald-200 border-2 border-solid border-gray-500 transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-emerald-500"
              key={credit.cast_id}
            >
              <img
                className="rounded-t "
                src={`https://image.tmdb.org/t/p/w500/${credit.profile_path}`}
                alt={credit.original_name}
              />
              <p className="text-slate-950 sm:text-sm xl:text-xl">
                {credit.original_name}
              </p>
              <p className="text-slate-950 sm:text-sm xl:text-xl">
                {credit.popularity}%
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
