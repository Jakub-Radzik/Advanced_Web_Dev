import { Movie, Screening } from "../movie"

export type Show = {
    movie: Movie,
    screening: Screening
    soldSeats: SoldSeat[]
    room: Room
}

export type SoldSeat = {
    row: number,
    seat: number
}

export type Room = {
    id: number,
    name : string,
    rows: number,
    seats_per_row: number,
    is_IMAX: boolean,
    alignment: string,
    screen_size: number,
    matrix: (boolean)[][]
}

