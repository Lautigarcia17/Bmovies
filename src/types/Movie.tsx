export interface Movie {
    Title: string;
    Year: number;
    Genre?: string;
    Director?: string;
    Actors?: string;
    Plot?: string;
    Poster: string;
    Trailer?: string;
    Rating?: number | string;
    imdbID?: string  
}