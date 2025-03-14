import { useEffect, useState } from "react";
import { ManageMovieResponse, Movie } from "../types/interface";
import { addMovie, checkIfMovieExists, deleteMovie, getMovies, updateMovie } from "../services/database";
import { UseMovieReturn } from "../types/type";
import { getYearsList } from "../utilities/getYearList";


export const useMovie = (idSession: string, search: string = '', queryFilter: string = '',  manageQuery: (query : string) => void): UseMovieReturn => {
    const [listMovies, setListMovies] = useState<Movie[]>([]);
    const [movieToDisplay, setMovieToDisplay] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const fetchData = async () => {
        try {
            setLoading(true)
            if (idSession) {
                const { data, error } = await getMovies(idSession);
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
                    setLoading(false);
                } else {
                    console.log(error);
                    setLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const saveMovie = async (movie: Movie) => {
        if (await checkIfMovieExists(movie.title) === false) {
            const { error, data } = await addMovie(movie)

            if (error) {
                throw new Error('Error inserting the movie');
            }
            data[0].created_at = new Date(data[0].created_at);
            setListMovies((prevMovies) => [...data, ...prevMovies]);
        }
        else {
            throw new Error(`Error! The movie has already been registered.`);
        }
    };

    const removeMovie = async (id: string): Promise<ManageMovieResponse> => {
        if (id != '') {
            const { error, data } = await deleteMovie(id)

            if (!error && data) setListMovies(listMovies.filter((movie) => movie.id !== data[0].id))

            return { data, error };
        }
        else {
            return { data: null, error: new Error('No identification was provided')};
        }
    };

    const modifyMovie = async (id: string, rating: number | null, trailer: string, isNewMovie: boolean = true): Promise<ManageMovieResponse> => {
        try {
            if (id !== '') {
                const updateData: any = {};

                if (isNewMovie) {
                    if (rating !== null) {
                        updateData.created_at = new Date();
                        updateData.rating = rating;
                        updateData.trailer = trailer; 
                    }
                } else {
                    updateData.rating = rating;
                    updateData.trailer = trailer;
                }

                if (Object.keys(updateData).length > 0) {
                    const { data, error } = await updateMovie(id, updateData);
                    if (!error && data) {
                        data[0].created_at = new Date(data[0].created_at);
                        setListMovies(listMovies.map((movie) => (movie.id === data[0].id ? data[0] : movie)));
                    }

                    return { data, error };
                } else {
                    return { data: null, error: new Error('No changes were made') };
                }
            } else {
                return { data: null, error: new Error('No identification was provided')};
            }
        } catch (error: any) {
            console.error('Update failed:', error);
            return { data: null, error };
        }
    };



    const filter = (): Array<Movie> => {
        if (!listMovies.length) return [];
    
        let moviesFiltered: Array<Movie> = listMovies.sort((a : Movie,b : Movie) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime());
    
        const validYears = getYearsList(2023).map((year) => year.toString());
    
        if (queryFilter) {
            // Filtrado según el queryFilter
            if (queryFilter === 'all') {
                moviesFiltered = listMovies;
            } else if (queryFilter === 'not seen') {
                moviesFiltered = listMovies.filter((movie) => movie.rating === null);
            } else if (queryFilter === 'seen') {
                moviesFiltered = listMovies.filter((movie) => movie.rating !== null);
            } else if (validYears.includes(queryFilter)) { // Filtrar por años válidos
                moviesFiltered = listMovies.filter(
                    (movie) =>
                        movie.created_at?.getFullYear().toString() === queryFilter && movie.rating != null
                );
            } else if (/^\d{1,2}$/.test(queryFilter)) { // Filtrar por rating (1-10)
                const rating = parseInt(queryFilter, 10);
                if (rating >= 1 && rating <= 10) {
                    moviesFiltered = listMovies.filter(
                        (movie) => movie.rating && Math.ceil(movie.rating) === rating
                    );
                } else {
                    
                    queryFilter = 'all';
                    manageQuery(queryFilter);
                    moviesFiltered = listMovies;
                }
            } else {
                queryFilter = 'all';
                manageQuery(queryFilter);
                moviesFiltered = listMovies;
            }
        }
    
        if (search) {
            moviesFiltered = moviesFiltered.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }
    
        return moviesFiltered;
    };



    useEffect(() => {
        if (idSession !== undefined && idSession !== null) {
            fetchData();
        }
    }, [idSession])




    useEffect(() => {
        setMovieToDisplay(filter());
    }, [listMovies, search, queryFilter])





    return { listMovies, movieToDisplay, loading, saveMovie, removeMovie, modifyMovie }
}