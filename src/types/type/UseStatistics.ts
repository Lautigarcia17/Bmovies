
export type UseStatistics = {
    moviesWatched: number,
    moviesToWatch: number,
    moviesPerYear: [string,number][],
    moviesByGenre: Record<string, number>,
    moviesByRating: {rating: number; count: number}[],
    moviesByDecade: Record<string, number>,
    moviesByMonth: Record<string, number>,
    currentYearOfMonth: number | undefined,

}