import { Link } from 'react-router-dom'
import styles from './MovieList.module.css'
import Example from '../ModalMovie/ModalMovie'
// import { useEffect, useState } from 'react';
// import axios from 'axios'

function MovieList(){

    const listMovies = [
        {
            "Title": "The Avengers",
            "Year": "2012",
            "imdbID": "tt0848228",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        },
        {
            "Title": "Avengers: Endgame",
            "Year": "2019",
            "imdbID": "tt4154796",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
        },
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Avengers: Age of Ultron",
            "Year": "2015",
            "imdbID": "tt2395427",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg"
        },
        {
            "Title": "The Avengers",
            "Year": "1998",
            "imdbID": "tt0118661",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZTQ4NmIzMTktOTdjOC00NzE4LWIzNTgtODkwNzM5ZjUzZDkxXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_SX300.jpg"
        },
        {
            "Title": "The Avengers: Earth's Mightiest Heroes",
            "Year": "2010–2012",
            "imdbID": "tt1626038",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYzA4ZjVhYzctZmI0NC00ZmIxLWFmYTgtOGIxMDYxODhmMGQ2XkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg"
        },
        {
            "Title": "Ultimate Avengers: The Movie",
            "Year": "2006",
            "imdbID": "tt0491703",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTYyMjk0NTMwMl5BMl5BanBnXkFtZTgwNzY0NjAwNzE@._V1_SX300.jpg",
        },
        {
            "Title": "The Avengers",
            "Year": "1961–1969",
            "imdbID": "tt0054518",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZWI4ZWM4ZWQtODk1ZC00MzMxLThlZmMtOGFmMTYxZTAwYjc5XkEyXkFqcGdeQXVyMTk0MjQ3Nzk@._V1_SX300.jpg"
        },
        {
            "Title": "Ultimate Avengers II",
            "Year": "2006",
            "imdbID": "tt0803093",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZjI3MTI5ZTYtZmNmNy00OGZmLTlhNWMtNjZiYmYzNDhlOGRkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
        },
        {
            "Title": "Avengers Assemble",
            "Year": "2012–2019",
            "imdbID": "tt2455546",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTY0NTUyMDQwOV5BMl5BanBnXkFtZTgwNjAwMTA0MDE@._V1_SX300.jpg"
        }
    ]


    return (
        <>
            <div className={styles.content}>
                <h1 className={styles.tittleList}>List Movies</h1>

                <Example />

                <div className={styles.elements}>
                    {listMovies.map((movie : any) => (
                        <Link to={`details/${movie.Title}`} key={movie.imdbID} className={styles.movieItem}>
                            <img src={movie.Poster} alt={movie.Title} className={styles.moviePoster} />
                            <h2 className={styles.tittleMovie}>{movie.Title}</h2>
                            <p className={styles.yearMovie}>Year: {movie.Year}</p>
                        </Link>
                    ))}
                </div>

            </div>
        </>
    )
}

export default MovieList