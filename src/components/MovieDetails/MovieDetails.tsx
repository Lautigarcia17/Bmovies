import classNames from 'classnames'
import styles from './MovieDetails.module.css'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import DropdownDetail from '../DropdownDetail/DropdownDetail'
import ModalEdit from '../ModalEdit/ModalEdit'
import { Movie } from '../../types/interface'
import { movieContext } from '../../context/MovieContext'


function MovieDetails( {movie, setMovie} : {movie:Movie, setMovie : any}) {
    const [showEdit,setShowEdit] = useState<boolean>(false);
    const navigate = useNavigate();
    const {removeMovie,modifyMovie} = useContext(movieContext)

    const colour = classNames(styles.rating, {
        [styles.ratingRed]: movie && parseFloat(movie.rating?.toString() || '0') < 5,
        [styles.ratingYellow]: movie && parseFloat(movie.rating?.toString() || '0') >= 5 && parseFloat(movie.rating?.toString() || '0') < 6,
        [styles.ratingGreen]: movie && parseFloat(movie.rating?.toString() || '0') >= 6,
    })

    const handleModalEdit= ()=>{
        setShowEdit(!showEdit);
    }


    const handleRemove = async ()=>{
        try {
            if(movie.id != ''){
                const {error} = await removeMovie(movie.id ?? '')
    
                if(error){
                    toast.error(`Error! the movie was not removed`, { position: 'top-right', duration: 3000 })     
                }
                else{
                    toast.success(`Congratulations! removed movie`, { position: 'top-right', duration: 3000 })
                    navigate('/');
                }
            }
        } catch (error) {
            console.log(error);   
        }
    }



    const handleEdit = async (rating: number | null, trailer: string) => {
        try {
            if(movie.id !== ''){
                const {data,error} = await modifyMovie(movie.id,rating,trailer);

                if (error) {
                    toast.error(`Error! The movie was not updated: ${error.message}`, { position: 'top-right', duration: 3000 });
                } else {
                    toast.success(`Congratulations! Movie updated successfully`, { position: 'top-right', duration: 3000 });
                    setMovie(data[0]);
                }

            }
        } catch (error:any) {
            console.error('Update failed:', error);
            toast.error(`Error! An unexpected error occurred: ${error.message}`, { position: 'top-right', duration: 3000 });
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>

                    <div className={styles.card}>
                        {movie && (
                            <>
                                <div className={styles.imageSection}>
                                    <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
                                    {movie.trailer && (
                                        <div className={styles.trailerSection}>
                                            <label>Trailer </label>
                                            <a href={movie.trailer} target='_blank'>
                                                <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 24 24"><g fill="#ffffff" fillRule="evenodd" clipRule="evenodd"><path d="M10.386 8.357A.75.75 0 0 0 9.25 9v6a.75.75 0 0 0 1.136.643l5-3a.75.75 0 0 0 0-1.286zM13.542 12l-2.792 1.675v-3.35z" /><path d="M17.03 4.641a64.499 64.499 0 0 0-10.06 0l-2.241.176a2.975 2.975 0 0 0-2.703 2.475a28.566 28.566 0 0 0 0 9.416a2.975 2.975 0 0 0 2.703 2.475l2.24.176c3.349.262 6.713.262 10.062 0l2.24-.176a2.975 2.975 0 0 0 2.703-2.475c.52-3.117.52-6.299 0-9.416a2.975 2.975 0 0 0-2.703-2.475zM7.087 6.137a62.998 62.998 0 0 1 9.828 0l2.24.175c.676.053 1.229.56 1.34 1.228a27.066 27.066 0 0 1 0 8.92a1.475 1.475 0 0 1-1.34 1.228l-2.24.175a62.98 62.98 0 0 1-9.828 0l-2.24-.175a1.475 1.475 0 0 1-1.34-1.228a27.066 27.066 0 0 1 0-8.92a1.475 1.475 0 0 1 1.34-1.228z" /></g></svg>
                                            </a>
                                        </div>
                                    )}

                                </div>
                                <div className={styles.movie}>
                                    <div className={styles.contentTittle}>
                                        <h2 className={styles.tittleMovie}>{movie.title}</h2>
                                    </div>
                                    <div className={styles.movieDetails}>
                                        {movie.year && (
                                            <div className={styles.data}>
                                                <label>Year </label>
                                                <p >{movie.year}</p>
                                            </div>
                                        )}
                                        {movie.plot && (
                                            <div className={styles.data}>
                                                <label>Plot </label>
                                                <p>{movie.plot}</p>
                                            </div>
                                        )}
                                        {movie.genre && (
                                            <div className={styles.data}>
                                                <label>Genre </label>
                                                <p >{movie.genre}</p>
                                            </div>
                                        )}
                                        {movie.director && (
                                            <div className={styles.data}>
                                                <label>Director </label>
                                                <p >{movie.director}</p>
                                            </div>
                                        )}
                                        {movie.actors && (
                                            <div className={styles.data}>
                                                <label>Actors </label>
                                                <p >{movie.actors}</p>
                                            </div>
                                        )}
                                    
                                    </div>

                                    {movie.rating && (
                                        <div className={colour}>{movie.rating}</div>
                                    )}
                                </div>

                                <div className={styles.actions}>
                                    <DropdownDetail handleModalEdit={handleModalEdit} handleRemove={handleRemove}/>
                                    <ModalEdit show={showEdit} handleModalEdit={handleModalEdit}  handleEdit={handleEdit}/>
                                </div>   
                            </>
                        )}
                 
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default MovieDetails