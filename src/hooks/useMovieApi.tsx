import { useState } from "react";
import { UseMovieApiReturn } from "../types/type";
import { Movie } from "../types/interface";
import { getFullMovie, getMovieId, getMovieSearch } from "../services/api";


export const useMovieApi = (): UseMovieApiReturn=> {

  const [movies, setMovies] = useState<Movie[]>([]);

  const findMovies = async (e: React.KeyboardEvent<HTMLInputElement>) => {

    if (e.currentTarget.value != '') {
      try {
        const response = await getMovieSearch(e.currentTarget.value);
        if (response.data && response.data.Search) {
          const arrayMovies: Movie[] = response.data.Search.map((data: any) => ({
            poster: data.Poster,
            title: data.Title,
            year: data.Year,
            imdbID: data.imdbID
          }))
          setMovies(arrayMovies);
        }
      } catch (error) {
        throw new Error('Error fetching movie data');
      }
    }
    else {
      setMovies([]);
    }
  }

  const findMovieById = async (e: React.MouseEvent<HTMLButtonElement>, imdbIDOption: string) => {
    e.preventDefault();
    if (imdbIDOption != '') {
      try {
        const response = await getMovieId(imdbIDOption)
        const data = response.data;
        if (data) {
          const arrayMovies: Movie[] = [{
            poster: data.Poster,
            title: data.Title,
            year: data.Year
          }]
          setMovies(arrayMovies);
        }
      } catch (error) {
        throw new Error('Error inserting the movie');
      }

    }
    else {
      setMovies([]);
    }

  }


  const getMovieDetails = async (title: string, year: number | null): Promise<Movie> => {
    try {
      const response = await getFullMovie(title, year);


      if (response && response.data) {
        const movie: Movie = {
          title: response.data.Title,
          year: response.data.Year !== 'N/A' ? parseInt(response.data.Year) : null,
          genre: response.data.Genre !== 'N/A' ? response.data.Genre : null,
          director: response.data.Director !== 'N/A' ? response.data.Director : null,
          actors: response.data.Actors !== 'N/A' ? response.data.Actors : null,
          plot: response.data.Plot !== 'N/A' ? response.data.Plot : null,
          poster: response.data.Poster
        };
        return movie;
      }
      throw new Error('No data found');
    } catch (error) {
      throw new Error('Error fetching movie data');
    }
  }




  return { movies, findMovies, findMovieById, getMovieDetails, setMovies }
}

