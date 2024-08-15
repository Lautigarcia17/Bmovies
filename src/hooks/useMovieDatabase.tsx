import { useState } from "react";
import { useMovieApi } from "./useMovieApi";
import { useAuth } from "./useAuth";
import { Movie } from "../types/interface";
import { addMovie, getMovieByTittle } from "../services/database";

export const useMovieDatabase = () => {
  const [movies, setMovies] = useState<Movie[]>([]);


  const checkIfMovieExists = async (title: string) => {
    const { data, error } = await getMovieByTittle(title);
    if (error) {
      console.error('Error checking if movie exists:', error);
      return false;
    }

    return data.length > 0;
  };


  const addDatabase = async (title: string, year: number | null, rating: number | null, urlTrailer: string | null) => {

    const { getMovieDetails } = useMovieApi();
    const { session } = useAuth();

    if (await checkIfMovieExists(title) == false) {

      const movieData = await getMovieDetails(title, year ?? null);

      if (!session) throw new Error('No session found');

      const movieAdd: Movie = {
        title: movieData.title,
        year: movieData.year,
        genre: movieData.genre,
        director: movieData.director,
        actors: movieData.actors,
        plot: movieData.plot,
        poster: movieData.poster,
        trailer: urlTrailer,
        rating: rating,
        user_id: session,
        created_at: new Date(),
      }

      const { error } = await addMovie(movieAdd)

      if (error) {
        console.log(error)
        throw new Error('Error inserting the movie');
      }

    }


  }



  return { addDatabase,checkIfMovieExists }
}

