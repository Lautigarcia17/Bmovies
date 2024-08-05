import { Link } from 'react-router-dom'
import styles from './MovieList.module.css'

import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import { Movie } from '../../types/Movie';

function MovieList(){
    const [listMovies,setListMovies] = useState<Movie[]>([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const {data,error} =  await supabase.from('movies').select().order('created_at',{ascending:false});
                
                if (!error) { 
                    const moviesDatabase : Movie[] = data.map( (movie : any) => ({
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
                    }) )
                    setListMovies([]);
                    setListMovies(moviesDatabase);
                }else{
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

        const subscription = supabase.channel('custom-all-chanel').on('postgres_changes',{event: '*',schema:'*',table: 'movies'}, ()=>{
            fetchData();
        }).subscribe()
        
        return () =>{
            supabase.removeChannel(subscription);
        }

    },[])

    return (
        <>
            <div className={styles.content}>
                {listMovies.length !== 0 ? (
                    <>
                        <div className={styles.elements}>
                            {listMovies.map((movie : Movie) => (
                                <Link to={`details/${movie.id}`} key={movie.id} className={styles.movieItem}>
                                    <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
                                    <h2 className={styles.tittleMovie}>{movie.title}</h2>
                                    <p className={styles.yearMovie}>Year: {movie.year}</p>
                                </Link>
                            ))}
                        </div>
                    </>
                ):
                    <div className={styles.withoutMovie}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#f5deb3" d="M14 20h-4v-9l-3.5 3.5l-2.42-2.42L12 4.16l7.92 7.92l-2.42 2.42L14 11z"/></svg>
                        <h1>Load your first movies!!</h1>
                    </div>
                }
  
            </div>

    
        </>
    )
}

export default MovieList