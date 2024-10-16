import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  console.log(movies);

  return (
    <ul className="grid gap-4 p-5 sm:pt-[250px] justify-between content-center sm:grid-cols-1 sm:p-5 md:grid-cols-2 md:p-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 pt-[220px] md:pt-[120px] ">
      {movies.map((movie) => (
        <li
          className="max-w-md bg-slate-600 border-2 border-solid border-gray-500 rounded-md shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-slate-600"
          key={movie.id}
        >
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              className="rounded-t-md"
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.original_title}
            />
            <p className="p-5 text-green-400 sm:text-sm xl:text-xl rounded-b-md">
              {movie.original_title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
