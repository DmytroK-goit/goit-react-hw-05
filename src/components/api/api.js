import axios from "axios";

const api = () => {
  const url =
    "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1";

  const options = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjQyYjAxNGUwMWY3OTM3ZjQ4ZDY1NzNmOTBjMmJjMSIsIm5iZiI6MTcyNzI3MTI3NC4xNjQ2NzIsInN1YiI6IjY2ZjQwNjk1ZmM2NTYzMjllMjBkZWQ3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7kEDDXOD_I80Tn51VpftyUjNOLPUoMVrK7xLeUi03i8",
    },
  };

  axios
    .get(url, options)
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};

export default api;
