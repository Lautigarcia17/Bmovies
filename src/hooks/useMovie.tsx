import { useEffect, useState } from "react";
import { Movie } from "../types/interface";
import { detectChanges, getMovies, removeDetectChanges } from "../services/database";
import { UseMovieReturn } from "../types/type";


export const useMovie = (search: string, queryFilter: string) : UseMovieReturn =>{
    const [listMovies, setListMovies] = useState<Movie[]>([]);
    const [movieToDisplay, setMovieToDisplay] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const filter = () => {
        let moviesFiltered: Array<Movie> = [];

        if (queryFilter !== '' && listMovies.length) {
            switch (queryFilter) {
                case 'all':
                    moviesFiltered = listMovies;
                    break;
                case 'not seen':
                    moviesFiltered = listMovies.filter((movie) => movie.rating == null)
                    break;
                case '2023':
                    moviesFiltered = listMovies.filter((movie) => movie.created_at?.getFullYear().toString() == queryFilter && movie.rating != null)
                    break;
                case '2024':
                    moviesFiltered = listMovies.filter((movie) => movie.created_at?.getFullYear().toString() == queryFilter && movie.rating != null)
                    break;
                default:
                    moviesFiltered = listMovies.filter((movie) => {
                        return movie.rating ? Math.ceil(movie.rating) == parseInt(queryFilter) : null
                    })
                    break;
            }
        }

        if (search !== '') moviesFiltered = moviesFiltered.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

        return moviesFiltered;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data, error } = await getMovies();
                if (!error) {
                    const moviesDatabase: Movie[] = data.map((movie: any) => ({
                        id: movie.id,
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
                        created_at: movie.created_at ? new Date(movie.created_at) : new Date()
                    }))
                    setListMovies(moviesDatabase);
                } else {
                    console.log(error);
                }

            } catch(error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
        }

        fetchData();

        const subscription = detectChanges(fetchData);
        return () => {
            removeDetectChanges(subscription);
        }
    }, [])

    useEffect(() => {
        setMovieToDisplay(filter());
    }, [listMovies,search,queryFilter])

    return {listMovies,movieToDisplay,loading}
}