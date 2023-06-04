import axios from "axios";
import { API_URL } from "../constants";

export const usePayments = () => {
    const reserveTickets = (tickets: number[]) => {
        console.log(tickets);
        axios.post(`${API_URL}/reserve/tickets`, { tickets }).then((res) => {console.log(res)});
    };

    const reserveTicketsEmail = (email: string) => 
        axios.post(`${API_URL}/reserve/buyer_info`, { email });

    const reserveCheckout = () => {
        return axios.post<any, any>(`${API_URL}/reserve/checkout`);
    }

    const sellTickets = () => {
        axios.post(`${API_URL}/reserve/sold`);
    }    

    return {
        reserveTickets,
        reserveTicketsEmail,
        reserveCheckout,
        sellTickets,
    }
}

