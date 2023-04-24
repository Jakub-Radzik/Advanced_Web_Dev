import axios from "axios";
import { Screenings } from "../types/movie";
import { Show } from "../types/show";

export const useScreenings = () => {
  const getMovieScreenings = (movieId: number) =>
    axios
      .get<{ screenings: Screenings }>(
        `http://localhost:5000/api/v1/screenings/${movieId}`
      )
      .then(response => response.data);

  const getScreening = (screeningId: number | string) =>
    axios
      .get<{ show: Show }>(
        `http://localhost:5000/api/v1/screening/${screeningId}`
      )
      .then(response => response.data);

  return { getMovieScreenings, getScreening };
};
