import axios, { AxiosResponse } from "axios";
import { API_URL } from "../constants";

export const usePayments = () => {
    const reserveTickets = (tickets: number[]) => {
        axios.post(`${API_URL}/reserve/tickets`, { tickets }, {
            withCredentials: true
        });
    };

    const reserveTicketsEmail = (email: string) => {
        return axios.post(`${API_URL}/reserve/buyer_info`, { email }, {
            withCredentials: true
        });
    }

    const reserveCheckout = () => {
        return axios.post<any, AxiosResponse<{client_secret: string}>>(`${API_URL}/reserve/checkout`,{}, {
            withCredentials: true
        })
    }

    const sellTickets = () => {
        return axios.post(`${API_URL}/reserve/sold`,{}, {
            withCredentials: true
        });
    }    

    return {
        reserveTickets,
        reserveTicketsEmail,
        reserveCheckout,
        sellTickets,
    }
}

