export type Movie = {
    id: number,
    title: string,
    original_title: string,
    poster_path: string,
    backdrop_path: string,
    overview: string,
    release_date: string,
    vote_average: number,
    vote_count: number,
    original_language: string,
    runtime: number,
    genres: string[],
    // director: string,
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
