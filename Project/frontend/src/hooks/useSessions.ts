import axios from "axios";
import { API_URL } from "../constants";
import { Session, Sessions } from "../types/movie";

export const useSessions = () => {
  const getMovieSessions = (movieId: number) =>
    axios
      .get<Sessions>(`${API_URL}/sessions/movie/${movieId}`)
      .then(response => response.data);

  const getSessionById = (sessionId: number) =>
    axios
      .get<Session>(`${API_URL}/sessions/${sessionId}`)
      .then(response => response.data);

  const getAllSessions = () => 
    axios
      .get<Session[]>(`${API_URL}/sessions`)
      .then(response => response.data);
      
  const postSession = (sessionBody: object) => {
    return axios
      .post(`${API_URL}/sessions`, sessionBody, {
        withCredentials: true,
      })
      .then(response => response.data);
  };

  const deleteSession = (id: number) => {
    axios.delete(`${API_URL}/sessions/${id}`, {
      withCredentials: true,
    });
  };

  return { getMovieSessions, getSessionById, getAllSessions, postSession, deleteSession };
};
