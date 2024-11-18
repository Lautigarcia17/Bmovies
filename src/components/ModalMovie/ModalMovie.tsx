import React, {  useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./ModalMovie.module.css";
import toast from 'react-hot-toast';
import { useMovieApi } from "../../hooks/useMovieApi";
import { useRating } from "../../hooks/useRating";
import { Movie } from "../../types/interface";
import { movieContext } from "../../context/MovieContext";
import { authContext } from "../../context/AuthContext";
import { useGenericContext } from "../../hooks/useGenericContext";


function ModalMovie({ show, handleModal }: { show: boolean, handleModal: () => void }) {

  const { movies, setMovies, findMovies, findMovieById, getMovieDetails } = useMovieApi();
  const { session } = useGenericContext(authContext);
  const { rating, setRatingFromValue, handleValidationRating } = useRating();
  const {saveMovie} = useGenericContext(movieContext)

  const [urlTrailer, setUrlTrailer] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [imdbIDOption, setImdbIDOption] = useState<string>('');
  const [showSearchByTitle, setShowSearchByTitle] = useState<boolean>(true);


  const handleUrlChange = (e: React.FocusEvent<HTMLInputElement>) => setUrlTrailer(e.target.value);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setMovies([]);
  };



  const handleSave = async () => {
    if (selectedMovie) {
      toast.promise((async () => {

        const movieData = await getMovieDetails(selectedMovie.title, selectedMovie.year ?? null);
        if (movieData) {
          movieData.trailer = urlTrailer;
          movieData.rating = rating;
          movieData.user_id = session ?? '';
          movieData.created_at = new Date()

          await saveMovie(movieData);
        }



        setSelectedMovie(null);
        setMovies([]);
        setUrlTrailer(null)
        setRatingFromValue(null);

      })(),
        {
          loading: 'Saving ...',
          success: 'Saved successfully!',
          error: (err) => {
            return err.message
          }
        }
      );
    }
    handleModal();
  };

  const handleViewOption = (state: boolean) => {
    setShowSearchByTitle(state)
    setMovies([]);
    setImdbIDOption('');
  }


  useEffect(() => {

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleKeyPress);
    } else {
      window.removeEventListener('keydown', handleKeyPress);
    }

    setMovies([]);
    setRatingFromValue(null);
    setUrlTrailer(null);
    setShowSearchByTitle(true);
    setImdbIDOption('');
  }, [show])



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
                      <input type="number" id="rating" name="rating" min="1" max="10" step="0.5" placeholder="6" value={rating == null ? '' : rating} onChange={(e) => setRatingFromValue(e.currentTarget.value)} onBlur={handleValidationRating} className={styles.ratingInput} />
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
                      <input type="text" className={styles.linkInput} value={urlTrailer == null ? '' : urlTrailer} placeholder="enter URL TRAILER..." onChange={handleUrlChange} />
                      <span className={styles.linkIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="#000000" d="M0 2v12h16V2zm3 11H1v-2h2zm0-4H1V7h2zm0-4H1V3h2zm9 8H4V3h8zm3 0h-2v-2h2zm0-4h-2V7h2zm0-4h-2V3h2zM6 5v6l4-3z" /></svg>
                      </span>
                    </div>
                  </div>
                ) : (

                  <div className={styles.searchList}>
                    <label className={styles.label}> Select Movie :</label>
                    <div className={styles.radioButtons}>
                      <input type="radio" id="excelent" name="search" value="Title" onClick={() => handleViewOption(true)} defaultChecked />
                      <label htmlFor="excelent">Title</label>

                      <input type="radio" id="good" name="search" value="good" onClick={() => handleViewOption(false)} />
                      <label htmlFor="good">IMDb ID</label>
                    </div>



                    {showSearchByTitle ? (
                      <input type="text" className={styles.search} placeholder="By Title ..." id="movie-search-box" onKeyUp={findMovies} />
                    ) : (
                      <div className={styles.contentImdbId}>
                        <input value={imdbIDOption ?? ''} type="text" className={styles.searchById} onChange={(e) => setImdbIDOption(e.target.value)} placeholder="By IMDb ID ..." />
                        <button className={styles.btnSearch} onClick={(e) => findMovieById(e, imdbIDOption)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" fillRule="evenodd" d="m16.325 14.899l5.38 5.38a1.008 1.008 0 0 1-1.427 1.426l-5.38-5.38a8 8 0 1 1 1.426-1.426M10 16a6 6 0 1 0 0-12a6 6 0 0 0 0 12" /></svg>
                        </button>
                      </div>
                    )
                    }

                    <div className={styles.contentList}>
                      {movies.map((movie: Movie, index: number) => (
                        <div key={index} className={styles.searchListItem} onClick={() => handleSelectMovie(movie)}>
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
    </>
  );
};

export default ModalMovie;
