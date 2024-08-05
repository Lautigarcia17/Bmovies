import classNames from 'classnames'
import styles from './MovieDetails.module.css'
import { Movie } from '../../types/Movie'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabase/client'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Spinner } from 'react-bootstrap'


function MovieDetails() {
    const { idMovie } = useParams<{ idMovie: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const colour = classNames(styles.rating, {
        [styles.ratingRed]: movie && parseFloat(movie.rating?.toString() || '0') < 5,
        [styles.ratingYellow]: movie && parseFloat(movie.rating?.toString() || '0') >= 5 && parseFloat(movie.rating?.toString() || '0') < 6,
        [styles.ratingGreen]: movie && parseFloat(movie.rating?.toString() || '0') >= 6,
    })

    useEffect(() => {

        if (idMovie) {
            setLoading(true)
            const fetchData = async () => {
                try {
                    const { data, error } = await supabase.from('movies').select().eq('id', idMovie);

                    if (data && !error) {
                        setMovie(data[0]);
                    } else {
                        toast.error(`Error! movie not found`, { position: 'top-right', duration: 3000 })
                        navigate('/');
                    }


                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            }

            fetchData();
        }
        else {
            navigate('/');
        }
    }, [])


    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>

                    {loading ? (
                        <div className={styles.spinner}>
                            <Spinner animation="border" variant="light" />
                        </div>
                    ) :
                        <div className={styles.card}>
                            <div className={styles.imageSection}>
                                <img src={movie?.poster} alt={movie?.title} className={styles.moviePoster} />
                                {movie?.trailer ? (
                                    <div className={styles.trailerSection}>
                                        <label>Trailer </label>
                                        <a href={movie?.trailer} target='_blank'>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24"><g fill="#ffffff" fillRule="evenodd" clipRule="evenodd"><path d="M10.386 8.357A.75.75 0 0 0 9.25 9v6a.75.75 0 0 0 1.136.643l5-3a.75.75 0 0 0 0-1.286zM13.542 12l-2.792 1.675v-3.35z" /><path d="M17.03 4.641a64.499 64.499 0 0 0-10.06 0l-2.241.176a2.975 2.975 0 0 0-2.703 2.475a28.566 28.566 0 0 0 0 9.416a2.975 2.975 0 0 0 2.703 2.475l2.24.176c3.349.262 6.713.262 10.062 0l2.24-.176a2.975 2.975 0 0 0 2.703-2.475c.52-3.117.52-6.299 0-9.416a2.975 2.975 0 0 0-2.703-2.475zM7.087 6.137a62.998 62.998 0 0 1 9.828 0l2.24.175c.676.053 1.229.56 1.34 1.228a27.066 27.066 0 0 1 0 8.92a1.475 1.475 0 0 1-1.34 1.228l-2.24.175a62.98 62.98 0 0 1-9.828 0l-2.24-.175a1.475 1.475 0 0 1-1.34-1.228a27.066 27.066 0 0 1 0-8.92a1.475 1.475 0 0 1 1.34-1.228z" /></g></svg>
                                        </a>
                                    </div>
                                ) : null}

                            </div>
                            <div className={styles.movie}>
                                <div className={styles.contentTittle}>
                                    <h2 className={styles.tittleMovie}>{movie && movie.title}</h2>
                                </div>
                                <div className={styles.movieDetails}>
                                    <div className={styles.data}>
                                        <label>Year </label>
                                        <p >{movie && movie.year}</p>
                                    </div>
                                    <div className={styles.data}>
                                        <label>Plot </label>
                                        <p>{movie && movie.plot}</p>
                                    </div>
                                    <div className={styles.data}>
                                        <label>Genre </label>
                                        <p >{movie && movie.genre}</p>
                                    </div>
                                    <div className={styles.data}>
                                        <label>Director </label>
                                        <p >{movie && movie.director}</p>
                                    </div>
                                    <div className={styles.data}>
                                        <label>Actors </label>
                                        <p >{movie && movie.actors}</p>
                                    </div>
                                </div>
                                
                                {movie?.rating ? (
                                    <div className={colour}>{movie && movie.rating}</div>
                                ):  null}

                                
                            </div>
                        </div>

                    }


                </div>
            </div>
        </>
    )
}

export default MovieDetails