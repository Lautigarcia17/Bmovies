
export type UseStatistics = {
    moviesWatched: number,
    moviesToWatch: number,
    moviesPerYear: Record<number, number>,
    moviesByGenre: Record<string, number>,
    moviesByRating: {rating: number; count: number}[],
    moviesByDecade: Record<string, number>,
    moviesByMonth: Record<string, number>,
    currentYearOfMonth: number | undefined,

}