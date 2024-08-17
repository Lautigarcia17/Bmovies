import { supabase } from "../supabase/client";
import { Movie, MovieEdit, UserLogin, UserRegister } from "../types/interface";

export const getSession = () => {
    return supabase.auth.getSession();
}

export const getMovies = (idUser : string) =>{
    return supabase.from('movies').select()
    .eq('user_id',idUser)
    .order('created_at', { ascending: false });
}

export const getMovieById = (id : string)=>{
    return supabase.from('movies').select().eq('id', id);
}

export const getMovieByTittle = (title : string)=>{
    return supabase.from('movies').select().eq('title', title);
}

export const addMovie = (movie: Movie) => {
    return supabase.from('movies').insert(movie).select()
}

export const deleteMovie = (idMovie: string) => {
    return supabase.from('movies').delete().eq('id', idMovie).select();
}

export const updateMovie = (idMovie: string, updateData: MovieEdit) => {
    return supabase.from('movies').update(updateData).eq('id', idMovie).select();
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

export const logOut = ()=>{
    return supabase.auth.signOut()
}

export const checkIfMovieExists = async (title: string) => {
    const { data, error } = await getMovieByTittle(title);
    if (error) {
      console.error('Error checking if movie exists:', error);
      return false;
    }

    return data.length > 0;
  };