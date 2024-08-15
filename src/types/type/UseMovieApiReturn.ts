import { Movie } from "../interface"

export type UseMovieApiReturn = {
    movies: Movie[],
    findMovies: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    findMovieById: (e: React.MouseEvent<HTMLButtonElement>,imdbIDOption : string) => void,
    getMovieDetails: (title: string, year: number | null) => Promise<Movie>,
    setMovies: (value: React.SetStateAction<Movie[]>) => void
}