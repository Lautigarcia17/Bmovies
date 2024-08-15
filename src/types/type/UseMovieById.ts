import { Movie } from "../interface"

export type UseMovieByIdReturn = {
    movie: Movie | null,
    loading: boolean,
    processCompleted: boolean
}