import axios from "axios";
import { Movie } from "../types/movie";
import { API_URL } from "../constants";

export const useMovies = () => {
  const getMovie = (movieId: number) =>
    axios
      .get<{ movie: Movie }>(`${API_URL}/movies/${movieId}`)
      .then(response => response.data);

  const getStoredMovies = () =>
    axios
      .get<{ results: Movie[] }>(`${API_URL}/stored/movies`)
      .then(response => response.data);

  return {
    getMovie,
    getMovies: getStoredMovies,
  };
};
