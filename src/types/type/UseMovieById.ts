import { Movie } from "../interface"

export type UseMovieByIdReturn = {
    movie: Movie | null,
    setMovie: React.Dispatch<React.SetStateAction<Movie | null>>;
    loading: boolean,
    processCompleted: boolean
}