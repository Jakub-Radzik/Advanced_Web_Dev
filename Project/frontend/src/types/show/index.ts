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
    name : string,
    rows: number,
    seats: number,
    isIMAX: boolean,
    aligment: string,
    screenWidth: number,
    matrix: (1 | null)[][]
}

