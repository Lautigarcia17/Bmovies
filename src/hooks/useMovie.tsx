import { useEffect, useState } from "react";
import { Movie } from "../types/interface";
import { addMovie, checkIfMovieExists, deleteMovie, getMovies, updateMovie } from "../services/database";
import { UseMovieReturn } from "../types/type";


export const useMovie = (session: string,search: string = '', queryFilter: string = '') : UseMovieReturn => {
    const [listMovies, setListMovies] = useState<Movie[]>([]);
    const [movieToDisplay, setMovieToDisplay] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const fetchData = async () => {
        try {
            setLoading(true)


            const { data, error } = await getMovies(session);
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

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const saveMovie = async (movie: Movie) => {
        if (await checkIfMovieExists(movie.title) == false) {
            const { error, data } = await addMovie(movie)

            if (error) {
                throw new Error('Error inserting the movie');
            }

            setListMovies((prevMovies) => [...data, ...prevMovies]);
        }
        else {
            throw new Error(`Error! The movie has already been registered.`);
        }
    };

    const removeMovie = async (id: string) => {
        if(id != ''){
            const {error,data} = await deleteMovie(id)

            if (!error && data) setListMovies(listMovies.filter((movie)=>movie.id !== data[0].id))

            return {data,error};
        }
    };

    const modifyMovie = async (id: string, rating: number | null, trailer: string) => {
        try {
            if(id !== ''){
                const updateData: any = {};
                if (rating !== null) updateData.rating = rating;
                if (trailer !== '') updateData.trailer = trailer;
        
                if (Object.keys(updateData).length > 0) {
                    const { data,error } = await updateMovie(id ?? '',updateData);
                    if (!error && data) setListMovies(listMovies.filter((movie)=>movie.id === data[0].id ? data[0] : movie))

                    return {data,error}
                } 
            }
        } catch (error:any) {
            console.error('Update failed:', error);
            return error;
        }
    };



    const filter = () => {
        let moviesFiltered: Array<Movie> = listMovies;

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
        if(session !== null){
            fetchData();
        }
    }, [session])




    useEffect(() => {
        setMovieToDisplay(filter());
    }, [listMovies, search, queryFilter])





    return { listMovies, movieToDisplay, loading, saveMovie, removeMovie, modifyMovie}
}