import { Movie } from "../interface"

export type UseMovieApiReturn = {
    movies: Movie[],
    findMovies: (characterSearch: string) => void,
    findMovieById: (imdbIDOption : string) => void,
    getMovieDetails: (title: string, year: number | null) => Promise<Movie>,
    setMovies: (value: React.SetStateAction<Movie[]>) => void
}