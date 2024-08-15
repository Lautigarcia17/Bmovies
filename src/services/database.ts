import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";
import { Movie, MovieEdit, UserLogin, UserRegister } from "../types/interface";



export const getSession = () => {
    return supabase.auth.getSession();
}

export const getMovies = () =>{
    return supabase.from('movies').select().order('created_at', { ascending: false });
}

export const getMovieById = (id : string)=>{
    return supabase.from('movies').select().eq('id', id);
}

export const getMovieByTittle = (title : string)=>{
    return supabase.from('movies').select().eq('title', title);
}


export const addMovie = (movie: Movie) => {
    return supabase.from('movies').insert(
        {
          title: movie.title,
          year: movie.year,
          genre: movie.genre,
          director: movie.director,
          actors: movie.actors,
          plot: movie.plot,
          poster: movie.poster,
          trailer: movie.trailer,
          rating: movie.rating,
          user_id: movie.user_id,
          created_at: movie.created_at,
        }
      )
}

export const deleteMovie = (idMovie: string) => {
    return supabase.from('movies').delete().eq('id', idMovie);
}

export const updateMovie = (idMovie: string, updateData: MovieEdit) => {
    return supabase.from('movies').update(updateData).eq('id', idMovie);
}


export const signInDatabase = (dataUser : UserLogin) => {
    return supabase.auth.signInWithPassword({
        email: dataUser.email,
        password: dataUser.password,
      });
}

export const signUpDatabase = (dataUser : UserRegister) =>{
    return supabase.auth.signUp({
        email: dataUser.email,
        password: dataUser.password,
        options: {
          data: {
            username: dataUser.username,
            age: dataUser.age
          }
        }
      })
}

export const detectChanges = ( functionUse : ()=> void ) =>{
    return supabase.channel('custom-all-chanel').on('postgres_changes', { event: '*', schema: '*', table: 'movies' }, () => {
        functionUse();
    }).subscribe();
}
export const removeDetectChanges = ( subscription : RealtimeChannel) =>{
    supabase.removeChannel(subscription);
}