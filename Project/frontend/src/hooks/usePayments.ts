import axios, { AxiosResponse } from "axios";
import { API_URL } from "../constants";

export const usePayments = () => {
    const reserveTickets = (tickets: number[]) => {
        console.log("reserve: ", tickets);
        axios.post(`${API_URL}/reserve/tickets`, { tickets }, {
            withCredentials: true
        }).then((res) => {console.log(res)});
    };

    const reserveTicketsEmail = (email: string) => {
        console.log("call  for: ", email)
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

