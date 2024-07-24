import { useParams } from 'react-router-dom'
import styles from './MovieDetails.module.css'

function MovieDetails(){
    const params = useParams<{idMovie : string}>();
    return (
        <>
            <h1>Movie with id {params.idMovie}</h1>
        </>
    )
}

export default MovieDetails