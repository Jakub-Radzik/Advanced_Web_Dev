import axios from "axios";
import { Screenings } from "../types/movie";
import { Show } from "../types/show";
import { API_URL } from "../constants";

export const useScreenings = () => {
  const getMovieScreenings = (movieId: number) =>
    axios
      .get<{ screenings: Screenings }>(
        `${API_URL}/screenings/${movieId}`
      )
      .then(response => response.data);

  const getScreening = (screeningId: number | string) =>
    axios
      .get<{ show: Show }>(
        `${API_URL}/screening/${screeningId}`
      )
      .then(response => response.data);

  return { getMovieScreenings, getScreening };
};
