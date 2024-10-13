import { useEffect, useState } from "react";
import { getMovieReviews } from "../../components/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useParams } from "react-router-dom";

const MovieReview = () => {
  const [movieReview, setMovieReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReview = async () => {
      setIsLoading(true);
      try {
        const dataReview = await getMovieReviews(movieId);
        setMovieReview(dataReview.results);
      } catch (error) {
        toast.error(`Сталася помилка: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieReview();
  }, [movieId]);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : movieReview.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <ul className="w-4/5 p-5">
          {movieReview.map((rev) => (
            <li key={rev.id}>
              <p>
                <strong>{rev.author}:</strong>
              </p>
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default MovieReview;
