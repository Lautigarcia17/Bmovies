export interface Movie {
    id? : string,
    title: string;
    year: number;
    genre?: string;
    director?: string;
    actors?: string;
    plot?: string;
    poster: string;
    trailer?: string | null;
    rating?: number | null;
    userId?: string; 
}