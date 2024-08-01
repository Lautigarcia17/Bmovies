import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./ModalMovie.module.css"; 
import axios from "axios";
import { Movie } from "../../types/Movie";
import toast, { Toaster } from 'react-hot-toast';



const ModalMovie = ({show,handleModal} : {show:boolean,handleModal:any}) => {
  const [rating, setRating] = useState<number | string>('');
  const [urlTrailer, setUrlTrailer] = useState<string>('');
  const [movies,setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const API_URL : string = 'http://www.omdbapi.com/?apikey=5b1461ac';

  const handleRatingChange = (e : React.FocusEvent<HTMLInputElement>) => setRating(parseFloat(e.target.value));
  const handleUrlChange = (e : React.FocusEvent<HTMLInputElement>) => setUrlTrailer(e.target.value);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setMovies([]); 
  };


  const findMovies = async (e : React.KeyboardEvent<HTMLInputElement>) =>{
   
    const response = await axios.get(API_URL + '&s=' + e.currentTarget.value);
    const data = response.data;
    if(data && data.Search){
        const arrayMovies : Movie[] = data.Search.map( (data:any) => ({
            poster: data.Poster,
            title : data.Title,
            year : data.Year,
            imdbID : data.imdbID
        }))
        setMovies(arrayMovies);
    }
  } 

  const roundToNearestHalf = (num: number) => {
    return Math.round(num * 2) / 2;
  };

  const validateRange = (e : React.FocusEvent<HTMLInputElement> ) =>{
    if(e.target.value !== ''){
      let value = parseFloat(e.target.value)

      if(value < 1 || isNaN(value)){
        value = 1;
      }else if(value>10){
        value = 10
      }
  
      e.target.value = roundToNearestHalf(value).toString();  
    }
  }


 

  const handleSave = () => {
    if (selectedMovie) {
      toast.promise(
        axios.get(API_URL + '&t=' + selectedMovie.title).then((response) => {
          if (response && response.data) {
            const movieSave: Movie = {
              title: response.data.Title,
              year: response.data.Year,
              genre: response.data.Genre,
              director: response.data.Director,
              actors: response.data.Actors,
              plot: response.data.Plot,
              poster: response.data.Poster,
              imdbID: response.data.ImbdID,
              trailer: urlTrailer,
              rating: rating,
            };

            console.log(movieSave);
          }
        }),
        {
          loading: 'Saving ...',
          success: 'Saved successfully!',
          error: 'Error saving',
        }
      );
    }
    handleModal();
  };


  return (
    <>

      <Modal show={show} onHide={handleModal} centered backdrop="static">
        <div className={styles.modalContent}>
          <Modal.Header className={styles.modalHeader} closeButton>
            <h2 className={styles.modalTitle}>Add Movie</h2>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <form className={styles.formControl}>
              <div className={styles.searchElement}>

                {selectedMovie ? (

                  <div>
                    <div className={styles.rating}>
                      <input type="number" id="rating" name="rating" min="1" max="10" step="0.5" placeholder="6" value={rating} onChange={handleRatingChange} onBlur={validateRange} className={styles.ratingInput}/>
                    </div>

                    <div className={styles.selectedMovie}>
                      <div className={styles.searchItemThumbnail}>
                        <img src={selectedMovie.poster} alt={selectedMovie.title} />
                      </div>
                      <div className={styles.searchItemInfo}>
                        <h3>{selectedMovie.title}</h3>
                        <p>{selectedMovie.year}</p>
                      </div>
                      <button className={styles.closeButton} onClick={() => setSelectedMovie(null)}>
                        &times; {/* Cruz */}
                      </button>
                    </div>

                    <div className={styles.linkInputContainer}>
                      <input type="text" className={styles.linkInput} value={urlTrailer} placeholder="enter URL TRAILER..." onChange={handleUrlChange}/>
                        <span className={styles.linkIcon}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="#000000" d="M0 2v12h16V2zm3 11H1v-2h2zm0-4H1V7h2zm0-4H1V3h2zm9 8H4V3h8zm3 0h-2v-2h2zm0-4h-2V7h2zm0-4h-2V3h2zM6 5v6l4-3z"/></svg>
                        </span>
                    </div>
                  </div>
                ) : (

                  <div className={styles.searchList}>
                      <label className={styles.label}> Select Movie :</label>
                      <input type="text" className={styles.search} placeholder="Search Movie Title ..." id="movie-search-box" onKeyUp={findMovies}/>

                      <div className={styles.contentList}>
                        {movies.map((movie: Movie) => (
                          <div key={movie.imdbID} className={styles.searchListItem} onClick={() => handleSelectMovie(movie)}>
                            <div className={styles.searchItemThumbnail}>
                              <img src={movie.poster} alt={movie.title} />
                            </div>
                            <div className={styles.searchItemInfo}>
                              <h3>{movie.title}</h3>
                              <p>{movie.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                  </div>

                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <button className={styles.btnCancel} onClick={handleModal}>
              Close
            </button>
            <button className={styles.btnSave} onClick={handleSave}>
              Save 
            </button>
          </Modal.Footer>
        </div>
      </Modal>
      <Toaster/>

    </>
  );
};

export default ModalMovie;
