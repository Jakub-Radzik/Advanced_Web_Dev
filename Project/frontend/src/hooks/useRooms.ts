import axios from "axios";
import { API_URL } from "../constants";
import { Room } from "../types/show";

export const useRooms = () => {
  const getRooms = () =>
    axios.get<Room[]>(`${API_URL}/rooms`).then(response => response.data);

  return { getRooms };
};
