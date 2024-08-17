import { PostgrestError } from "@supabase/supabase-js";

export interface MovieEdit{
    trailer: string | null;
    rating: number | null;
}

export interface Movie extends Partial<MovieEdit>{
    id? : string,
    title: string ;
    year: number | null;
    genre?: string | null;
    director?: string | null;
    actors?: string | null;
    plot?: string | null;
    poster: string ;
    user_id?: string; 
    created_at? : Date;
}
export interface ManageMovieResponse {
    data: Movie[] | null; 
    error: PostgrestError | null; 
}