export interface Movie {
    id? : string,
    title: string ;
    year: number | null;
    genre?: string | null;
    director?: string | null;
    actors?: string | null;
    plot?: string | null;
    poster: string ;
    trailer?: string | null;
    rating?: number | null;
    user_id?: string; 
    created_at? : Date;
}