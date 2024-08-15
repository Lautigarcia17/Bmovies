import { Link } from 'react-router-dom'
import styles from './MovieList.module.css'
import { Movie } from '../../types/interface'


function MovieList({ listMovies, movieToDisplay }: any) {
    return (
        <>
            <div className={styles.content}>
                <>
                    {listMovies.length !== 0 ? (
                        <>
                            <div className={styles.elements}>
                                {
                                    movieToDisplay.length !== 0 ? (

                                        movieToDisplay.map((movie: Movie) => (
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
            </div>


        </>
    )
}

export default MovieList