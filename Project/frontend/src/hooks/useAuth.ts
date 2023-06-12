import axios from "axios"
import { API_URL } from "../constants"

export const useAuth = () => {
    const logout = () => {
        axios.get(`${API_URL}/auth/logout`)
    }

    return {
        logout
    }
}