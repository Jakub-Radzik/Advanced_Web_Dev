import axios from "axios";
import { Movie } from "../types/movie";

export const useMovies = () => {
  const getMovie = (movieId: number) =>
    axios
      .get<{ movie: Movie }>(`http://localhost:5000/api/v1/movies/${movieId}`)
      .then(response => response.data);

  const getMovies = () =>
    axios
      .get<{ movies: Movie[] }>("http://localhost:5000/api/v1/movies")
      .then(response => response.data);

  return {
    getMovie,
    getMovies,
  };
};
