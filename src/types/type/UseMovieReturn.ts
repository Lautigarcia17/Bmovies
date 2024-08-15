import { Movie } from "../interface"

export type UseMovieReturn = {
    listMovies: Movie[],
    movieToDisplay: Movie[],
    loading : boolean
}