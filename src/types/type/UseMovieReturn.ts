import { ManageMovieResponse, Movie } from "../interface"

export type UseMovieReturn = {
    listMovies: Movie[],
    movieToDisplay: Movie[],
    loading: boolean,
    saveMovie: (movie:Movie) => void,
    removeMovie: (id: string) => Promise<ManageMovieResponse | undefined>
    modifyMovie: (id: string, rating: number | null, trailer: string, isNewMovie : boolean) => Promise<ManageMovieResponse | undefined>
}