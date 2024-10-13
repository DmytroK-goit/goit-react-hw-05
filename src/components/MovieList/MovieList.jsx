import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  console.log(movies);

  return (
    <ul className="grid gap-4 justify-between content-center p-20 sm:grid-cols-1 p-5 md:grid-cols-2 p-10 lg:grid-cols-3 p-15 xl:grid-cols-4 2xl:grid-cols-4">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              className=""
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.original_title}
              width={300}
            />
            <p className=" sm:text-sm xl:text-xl">{movie.original_title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
