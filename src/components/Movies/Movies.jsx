import React from "react";

const Movies = ({ movie }) => {
  return (
    <div>
      <h3>{movie.original_title}</h3>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
      {/* Додайте інші поля фільму, які потрібно відобразити */}
    </div>
  );
};

export default Movies;
