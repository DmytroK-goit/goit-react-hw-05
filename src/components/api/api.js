import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjQyYjAxNGUwMWY3OTM3ZjQ4ZDY1NzNmOTBjMmJjMSIsIm5iZiI6MTcyNzI3MTI3NC4xNjQ2NzIsInN1YiI6IjY2ZjQwNjk1ZmM2NTYzMjllMjBkZWQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7kEDDXOD_I80Tn51VpftyUjNOLPUoMVrK7xLeUi03i8",
  },
};

const fetchTrending = async () => {
  try {
    const response = await axios.get(
      "trending/movie/day?language=en-US",
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};
const surchMovie = async (query) => {
  try {
    const response = await axios.get(
      `search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(
      `movie/${movieId}?language=en-US`,
      options
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};
export { fetchTrending, surchMovie, getMovieDetails };
