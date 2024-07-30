import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./ModalMovie.module.css"; // Asegúrate de que este archivo contenga tus estilos personalizados
import axios from "axios";
import { Movie } from "../../types/Movie";




const Example = () => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState("");
  const [url, setUrl] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRatingChange = (e: any) => setRating(e.target.value);
  const handleUrlChange = (e: any) => setUrl(e.target.value);


  const handleSave = () => {
    handleClose();
  };



  const API_URL = 'http://www.omdbapi.com/?apikey=5b1461ac';
  const [movies,setMovies] = useState<Movie[] >([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);



  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setMovies([]); 
  };


  const findMovies = async (e : any) =>{
   
    const response = await axios.get(API_URL + '&s=' + e.target.value);
    const data = response.data;
    if(data && data.Search){
        setMovies(data.Search);
        console.log('Movies set:', movies);
    }
  } 

  const roundToNearestHalf = (num: number) => {
    return Math.round(num * 2) / 2;
  };

  const validateRange = (e : React.FocusEvent<HTMLInputElement> ) =>{
    let value = parseFloat(e.target.value)

    if(value < 1 || isNaN(value)){
      value = 1;
    }else if(value>10){
      value = 10
    }



    e.target.value = roundToNearestHalf(value).toString();
  }


  useEffect( ()=>{
    setSelectedMovie({
      Poster : 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg',
      Title: "Cars",
      Year: 2006,
      imdbID: "tt0317219"
    })
  },[])



  return (
    <>
      <button className={styles.btn} onClick={handleShow}>Add movie</button>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <div className={styles.modalContent}>
          <Modal.Header className={styles.modalHeader} closeButton>
            <h2 className={styles.modalTitle}>Add Movie</h2>
          </Modal.Header>
          <Modal.Body>
            <form className={styles.formControl}>

    


              <div className={styles.searchElement}>

                
                {selectedMovie ? (

                  <div>
                    <div className={styles.rating}>
                      <input type="number" id="rating" name="rating" min="1" max="10" step="0.5" placeholder="6" value={rating} onChange={handleRatingChange} onBlur={validateRange} className={styles.ratingInput}/>
                    </div>

                    <div className={styles.selectedMovie}>
                      <div className={styles.searchItemThumbnail}>
                        <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
                      </div>
                      <div className={styles.searchItemInfo}>
                        <h3>{selectedMovie.Title}</h3>
                        <p>{selectedMovie.Year}</p>
                      </div>
                      <button className={styles.closeButton} onClick={() => setSelectedMovie(null)}>
                        &times; {/* Cruz */}
                      </button>
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
                            <img src={movie.Poster} alt={movie.Title} />
                          </div>
                          <div className={styles.searchItemInfo}>
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>



                {/* <input type="text" placeholder="Url..." value={url} onChange={handleUrlChange} className={styles.urlInput}/> */}
            </form>
          </Modal.Body>
          <Modal.Footer className={styles.modalFooter}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default Example;
