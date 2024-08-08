import { Link } from 'react-router-dom'
import styles from './MovieList.module.css'
import { Spinner } from 'react-bootstrap'
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { Movie } from '../../types/Movie';

function MovieList({ search, queryFilter, setShowSearch }: { search: string, queryFilter : string, setShowSearch: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [listMovies, setListMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    

    const filter = ()=>{
        let moviesFiltered : Array<any> = [];

        if(queryFilter !== ''){
            switch (queryFilter) {
                case 'all':
                        moviesFiltered = listMovies;
                    break;
                case 'not seen':
                        moviesFiltered = listMovies.filter( (movie)=> movie.rating == null)
                    break;
                case '2023':
                    moviesFiltered = listMovies.filter( (movie)=> movie.created_at?.getFullYear().toString() == queryFilter && movie.rating != null)
                    break;
                case '2024':
                    moviesFiltered = listMovies.filter( (movie)=> movie.created_at?.getFullYear().toString() == queryFilter && movie.rating != null)
                    break;
                default:
                    moviesFiltered = listMovies.filter( (movie)=> {
                        return movie.rating ? Math.ceil(movie.rating) == parseInt(queryFilter) : null
                    })
                    break;
            }
        }

        if(search !== '')  moviesFiltered = moviesFiltered.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
        
        return moviesFiltered;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase.from('movies').select().order('created_at', { ascending: false });
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
                    // setListMovies([]);
                    setListMovies(moviesDatabase);
                    setShowSearch(true);
                } else {
                    console.log(error);
                }
                setLoading(false);

            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        const subscription = supabase.channel('custom-all-chanel').on('postgres_changes', { event: '*', schema: '*', table: 'movies' }, () => {
            fetchData();
        }).subscribe()

        return () => {
            supabase.removeChannel(subscription);
        }

    }, [])

    const moviesToDisplay = filter();
    return (
        <>
            <div className={styles.content}>
                {loading ? (
                    <div className={styles.spinner}>
                        <Spinner animation="border" variant="light" />
                    </div>
                ) : (
                    <>
                        {listMovies.length !== 0 ? (
                            <>
                                <div className={styles.elements}>
                                    {
                                        moviesToDisplay.length !==0 ? (

                                        moviesToDisplay.map((movie: Movie) => (
                                            <Link to={`details/${movie.id}`} key={movie.id} className={styles.movieItem}>
                                                <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
                                                <h2 className={styles.tittleMovie}>{movie.title}</h2>
                                                {movie.genre && (
                                                    <p className={styles.dataMovie}>{movie.genre}</p>
                                                )}
                                                {movie.rating && (
                                                    <p className={styles.dataMovie}>{movie.created_at?.getFullYear()}</p>
                                                )}
                                            </Link>
                                        ))
                                    ) :
                                        <div className={styles.withoutResults}>
                                            <h1> Without results !</h1>
                                        </div>

                                    }
                                </div>
                            </>
                        ) :
                            <div className={styles.withoutMovie}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#f5deb3" d="M14 20h-4v-9l-3.5 3.5l-2.42-2.42L12 4.16l7.92 7.92l-2.42 2.42L14 11z" /></svg>
                                <h1>Load your first movies!!</h1>
                            </div>
                        }
                    </>
                )}
            </div>


        </>
    )
}

export default MovieList