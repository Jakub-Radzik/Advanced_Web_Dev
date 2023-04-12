export const BASE_TICKET_PRICE = 20

enum TicketType {
    NORMAL = 'Normalny',
    STUDENT = 'Student',
    UCZEN = 'Uczeń',
    SENIOR = 'Senior',
}

//! ENDPOINT 
export const tickets: Ticket[] = [
    {
        type: TicketType.NORMAL,
        price: 20,
    },
    {
        type: TicketType.STUDENT,
        price: 10,
    },
    {
        type: TicketType.UCZEN,
        price: 14,
    },
    {
        type: TicketType.SENIOR,
        price: 6,
    },
]

export type Ticket = {
    type: TicketType
    price: number
}

export type SelectedPlace = {
    row: number;
    seat: number;
    ticket: Ticket;
}