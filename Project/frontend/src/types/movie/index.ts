export type Movie = {
    title: string,
    year: string,
    img: string,
    director: string,
    duration: string,
    genre: string[],
    rate: number,
    cinemaScreenings: CinemaScreening[]
}


export type CinemaScreening = {
    date: string,
    times: string[],
}