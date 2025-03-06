import { Link } from 'react-router-dom'
import { Movie } from '../../types/interface'
import styles from './MovieList.module.css'
import classNames from 'classnames'

function MovieList({ movieToDisplay }: { movieToDisplay: Array<Movie> }) {

    const getColourRating = (rating : number)=>{
        return classNames(styles.overlayRating, {
            [styles.ratingRed]: rating && parseFloat(rating?.toString() || '0') < 5,
            [styles.ratingYellow]: rating && parseFloat(rating?.toString() || '0') >= 5 && parseFloat(rating?.toString() || '0') < 6,
            [styles.ratingGreen]: rating && parseFloat(rating?.toString() || '0') >= 6,
        })
    }


    return (
        <>
            <div className={styles.content}>
                <>
                    <>
                        <div className={styles.elements}>
                            {
                                movieToDisplay.length !== 0 ? (

                                    movieToDisplay.map((movie: Movie) => (
                                        <Link to={`details/${movie.id}`} key={movie.id} className={styles.movieItem}>
                                            <div className={styles.imageContainer}>
                                                <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />

                                            </div>
                                            <div className={styles.details}>
                                            <h2 className={styles.titleMovie}>{movie.title}</h2>
                                                {movie.genre && (
                                                    <p className={styles.dataMovie}>{movie.genre}</p>
                                                )}
                                                {movie.rating && (
                                                    <p className={styles.dataMovie}>{movie.created_at?.getFullYear()}</p>
                                                )}
                                            </div>
                                            {movie.rating  && 
                                                    <div className={getColourRating(movie.rating)}>{movie.rating}</div>
                                                }
                                        </Link>
                                    ))
                                ) :
                                    <div className={styles.withoutResults}>
                                        <h1> Without results !</h1>
                                    </div>

                            }
                        </div>
                    </>
                </>
            </div>
        </>
    )
}

export default MovieList