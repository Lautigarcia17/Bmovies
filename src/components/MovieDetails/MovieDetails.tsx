// import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import styles from './MovieDetails.module.css'

interface Movie {
    Title: string;
    Year: number;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Poster: string;
    Trailer: string;
    Rating: number;
    ViewedYear: number;  
}



function MovieDetails(){
    // const params = useParams<{idMovie : string}>();

    const movie : Movie= 
    {
        Title:"The Avengers",
        Year:2012,
        Genre:"Action, Sci-Fi",
        Director:"Joss Whedon",
        Actors:"Robert Downey Jr., Chris Evans, Scarlett Johansson",
        Plot:"Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        Poster:"https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        Trailer:"https://www.youtube.com/watch?v=hA6hldpSTF8",
        Rating: 8.5,
        ViewedYear: 2023,
    }
    
    const colour = classNames(styles.rating,{
        [styles.ratingRed]: movie.Rating < 5,
        [styles.ratingYellow]: movie.Rating >= 5 && movie.Rating < 6,
        [styles.ratingGreen]: movie.Rating >= 6,
    })
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        <div className={styles.imageSection}>
                            <img src={movie.Poster} alt={movie.Title} className={styles.moviePoster} />
                            <div className={styles.trailerSection}>
                                    <label>Trailer </label>
                                    <a href="https://www.youtube.com/watch?v=hA6hldpSTF8">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><g fill="#ffffff" fillRule="evenodd" clipRule="evenodd"><path d="M10.386 8.357A.75.75 0 0 0 9.25 9v6a.75.75 0 0 0 1.136.643l5-3a.75.75 0 0 0 0-1.286zM13.542 12l-2.792 1.675v-3.35z"/><path d="M17.03 4.641a64.499 64.499 0 0 0-10.06 0l-2.241.176a2.975 2.975 0 0 0-2.703 2.475a28.566 28.566 0 0 0 0 9.416a2.975 2.975 0 0 0 2.703 2.475l2.24.176c3.349.262 6.713.262 10.062 0l2.24-.176a2.975 2.975 0 0 0 2.703-2.475c.52-3.117.52-6.299 0-9.416a2.975 2.975 0 0 0-2.703-2.475zM7.087 6.137a62.998 62.998 0 0 1 9.828 0l2.24.175c.676.053 1.229.56 1.34 1.228a27.066 27.066 0 0 1 0 8.92a1.475 1.475 0 0 1-1.34 1.228l-2.24.175a62.98 62.98 0 0 1-9.828 0l-2.24-.175a1.475 1.475 0 0 1-1.34-1.228a27.066 27.066 0 0 1 0-8.92a1.475 1.475 0 0 1 1.34-1.228z"/></g></svg>
                                    </a>

                            </div>
                        </div>
                        <div className={styles.movie}>
                            <div className={styles.contentTittle}>
                                <h2 className={styles.tittleMovie}>{movie.Title}</h2>
                            </div>
                            <div className={styles.movieDetails}>
                                <div className={styles.data}>
                                    <label>Year </label>
                                    <p >{movie.Year}</p>
                                </div>
                                <div className={styles.data}>
                                    <label>Plot </label>
                                    <p>{movie.Plot}</p>
                                </div>
                                <div className={styles.data}>
                                    <label>Genre </label>
                                    <p >{movie.Genre}</p>
                                </div>
                                <div className={styles.data}>
                                    <label>Director </label>
                                    <p >{movie.Director}</p>
                                </div>
                                <div className={styles.data}>
                                    <label>Actors </label>
                                    <p >{movie.Actors}</p>
                                </div>
                            </div>



                            <div className={ colour}>{movie.Rating}</div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MovieDetails