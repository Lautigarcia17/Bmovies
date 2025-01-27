import styles from './ProfilePage.module.css'
import { Carousel } from "react-bootstrap";
import { authContext } from "../../context/AuthContext"
import { useGenericContext } from "../../hooks/useGenericContext"
import { useStatistics } from '../../hooks/useStatistics';
import { movieContext } from '../../context/MovieContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function ProfilePage() {

    const { userData } = useGenericContext(authContext);
    const { listMovies } = useGenericContext(movieContext)
    const { moviesWatched, moviesToWatch, moviesPerYear, moviesByGenre, moviesByRating, moviesByDecade, moviesByMonth, currentYearOfMonth } = useStatistics(listMovies)
    const navigate = useNavigate();
    const { idSession, loadingSession } = useGenericContext(authContext)

    useEffect(() => {
        const fetchSession = () => {
            if (!idSession && !loadingSession) {
                navigate('/auth');
            }
        }
        fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idSession])


    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.dataUser}>
                        <h1>{userData?.username}</h1>
                        <h2>Movies watched: {moviesWatched}</h2>
                        <h2>Movies to watch: {moviesToWatch}</h2>
                    </div>


                    <div className={styles.contentCarouselGrid}>
                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES SEEN PER YEAR</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    {moviesPerYear.map(([year, count]: [string, number]) => (
                                        <Carousel.Item key={year} interval={3000}>
                                            <div className={styles.carouselItem}>
                                                <h3>{year}</h3>
                                                <p>{count} movie(s)</p>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>

                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES BY GENRE</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    {Object.entries(moviesByGenre as Record<string, number>).map(([genre, count]) => (
                                        <Carousel.Item key={genre} interval={3000}>
                                            <div className={styles.carouselItem}>
                                                <h3>{genre}</h3>
                                                <p>{count} movie(s)</p>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>

                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES BY RATING</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    {moviesByRating.map(({ rating, count }: { rating: number, count: number }) => (
                                        <Carousel.Item key={rating} interval={3000}>
                                            <div className={styles.carouselItem}>
                                                <h3>{rating}</h3>
                                                <p>{count} movie(s)</p>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentCarouselFlex}>
                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES BY DECADE</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    {Object.entries(moviesByDecade as Record<string, number>).map(([decade, count]) => (
                                        <Carousel.Item key={decade} interval={3000}>
                                            <div className={styles.carouselItem}>
                                                <h3>{decade}</h3>
                                                <p>{count} movie(s)</p>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>

                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES WATCHED PER MONTH ({currentYearOfMonth})</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    {Object.entries(moviesByMonth as Record<string, number>).map(([month, count]) => (
                                        <Carousel.Item key={month} interval={3000}>
                                            <div className={styles.carouselItem}>
                                                <h3>{month}</h3>
                                                <p>{count} movie(s)</p>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
