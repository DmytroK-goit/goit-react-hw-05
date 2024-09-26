// MovieDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "/Users/dmytro.kovbasiuk/Desktop/HTML/EDU JS/goit-react-hw-05/src/components/api/api"; // Запит для отримання деталей фільму

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const dataDetails = await getMovieDetails(movieId);
        setMovieDetails(dataDetails);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movieDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.overview}</p>
      <p>Release date: {movieDetails.release_date}</p>
    </div>
  );
};

export default MovieDetailsPage;
