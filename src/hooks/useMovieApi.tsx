import { useRef, useState } from "react";
import { UseMovieApiReturn } from "../types/type";
import { Movie } from "../types/interface";
import { getFullMovie, getMovieId, getMovieSearch } from "../services/api";
import { normalizeSearchTerm } from "../utilities/normalizeSearchTerm";


export const useMovieApi = (): UseMovieApiReturn => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [lastSearch, setLastSearch] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // DEBOUNCE


  const findMovies = async (characterSearch: string) => {
    if (characterSearch != '') {
      const normalizedSearch = normalizeSearchTerm(characterSearch);
      if (normalizedSearch === lastSearch) { //No repeat the same query
        return;
      }
      setLastSearch(normalizedSearch);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(async () => {
        try {
          const response = await getMovieSearch(normalizedSearch);
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
      }, 750);

    }
    else {
      setMovies([]);
    }

  }

  const findMovieById = async (imdbIDOption: string) => {
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

