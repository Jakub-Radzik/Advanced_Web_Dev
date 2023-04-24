export type Movie = {
    id: number,
    title: string,
    year: string,
    img: string,
    director: string,
    duration: string,
    genre: string[],
    rate: number,
}

export type Screenings = {
    date: string,
    times: {
        id: number,
        time: string,
    }[],
}[];

export type Screening = {
    id: number,
    date: string,
    time: string,
}
