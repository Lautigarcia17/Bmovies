import { useNavigate, useParams } from 'react-router-dom';
import { useMovieById } from '../../hooks/useMovieById'
import styles from './MoviePage.module.css'
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import MovieDetails from './MovieDetails/MovieDetails';

function MoviePage() {
    const { idMovie } = useParams<{ idMovie: string }>();
    const { movie,setMovie, loading, processCompleted } = useMovieById(idMovie || '');
    const navigate = useNavigate();


    useEffect(() => {
        if (processCompleted && (idMovie === null || movie === null)) {
            toast.error(`Error! movie not found`, { position: 'top-right', duration: 2000 })
            navigate('/');
        }
    }, [movie, processCompleted])


    return (
        <>
        <div className={styles.container}>
        <div className={styles.content}>
                {loading ? (
                    <div className={styles.spinner}>
                        <Spinner animation="border" variant="light" />
                    </div>
                ) : (movie &&
                        <MovieDetails movie={movie} setMovie={setMovie}/>
                    )
                }
            </div>
        </div>

        </>
    )
}

export default MoviePage