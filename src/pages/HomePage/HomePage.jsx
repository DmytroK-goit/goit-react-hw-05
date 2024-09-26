import React, { useEffect, useState } from "react";
import { fetchTrending } from "/Users/dmytro.kovbasiuk/Desktop/HTML/EDU JS/goit-react-hw-05/src/components/api/api";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrending();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
