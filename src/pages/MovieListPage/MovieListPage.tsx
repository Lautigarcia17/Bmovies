import { useState } from 'react';
import styles from './MovieListPage.module.css'
import { Spinner } from 'react-bootstrap';
import SearchMovie from '../../components/SearchMovie/SearchMovie';
import DropdownFilter from '../../components/DropdownFilter/DropdownFilter';
import { useQueryFilter } from '../../hooks/useQueryFilter';
import { useMovie } from '../../hooks/useMovie';
import ModalMovie from '../../components/ModalMovie/ModalMovie';
import MovieList from '../../components/MovieList/MovieList';


function MovieListPage() {

    const [show, setShow] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const { queryFilter, manageQuery } = useQueryFilter();
    const { listMovies, movieToDisplay, loading } = useMovie(search, queryFilter)

    const handleModal = () => setShow(!show);

    return (
        <>
            <div className={styles.content}>
                <h1 className={styles.tittleList}>List Movies</h1>

                <div className={`${styles.sectionAdd} ${styles.element}`}>
                    <button onClick={handleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#ffffff" d="m19.65 6.5l-2.74-3.54l3.93-.78l.78 3.92zm-2.94.57l-2.74-3.53l-1.97.39l2.75 3.53zM19 13c1.1 0 2.12.3 3 .81V10H2v10a2 2 0 0 0 2 2h9.81c-.51-.88-.81-1.9-.81-3c0-3.31 2.69-6 6-6m-7.19-4.95L9.07 4.5l-1.97.41l2.75 3.53zM4.16 5.5l-.98.19a2.01 2.01 0 0 0-1.57 2.35L2 10l4.9-.97zM20 18v-3h-2v3h-3v2h3v3h2v-3h3v-2z" /></svg>
                    </button>
                </div>
                <ModalMovie show={show} handleModal={handleModal} />


                {loading ? (

                    <div className={styles.spinner}>
                        <Spinner animation="border" variant="light" />
                    </div>

                ) : (
                    <>
                        {listMovies.length > 0 && (
                            <>
                                <div className={styles.element}>
                                    <SearchMovie setSearch={setSearch} />
                                </div>

                                <div className={styles.element}>
                                    <div className={styles.filterQuery}>
                                        <DropdownFilter handleQuery={manageQuery} />
                                        <label>{queryFilter}</label>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className={styles.element}>
                            <MovieList listMovies={listMovies} movieToDisplay={movieToDisplay} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default MovieListPage