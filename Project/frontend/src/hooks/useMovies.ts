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
      .get<Movie[]>(`${API_URL}/stored/movies`)
      .then(response => response.data);

  const getMovies = () =>
    axios
      .get<{ results: Movie[] }>(`${API_URL}/movies`, { withCredentials: true })
      .then(response => response.data);

  const postStoredMovie = (movieBody: object) => {
    return axios.post(`${API_URL}/stored/movies`, movieBody, {
      withCredentials: true,
    }).then(response => response.data);
  };

  const deleteStoredMovie = (movieId: number) => {
    axios
      .delete(`${API_URL}/stored/movies/${movieId}`, {
        withCredentials: true
      });
  };

  const flushCache = () => {
    axios
      .get(`${API_URL}/flush-cache`, {
        withCredentials: true
      });
  };

  return {
    getMovie,
    getStoredMovies,
    getMovies,
    postStoredMovie,
    deleteStoredMovie,
    flushCache,
  };
};
