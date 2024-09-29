import { useEffect, useState } from "react";
import { getMovieReviews } from "../../components/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const MovieReview = ({ movieId }) => {
  const [movieReview, setMovieReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        <ul>
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
