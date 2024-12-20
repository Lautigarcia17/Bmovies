import styles from './ProfilePage.module.css'
import { Carousel } from "react-bootstrap";
import { authContext } from "../../context/AuthContext"
import { useGenericContext } from "../../hooks/useGenericContext"


export function ProfilePage() {

    const { userData } = useGenericContext(authContext);


    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.dataUser}>
                        <h1>{userData?.username}</h1>
                        <h2>Movies watched: 220</h2>
                        <h2>Movies to watch: 10</h2>
                    </div>


                    <div className={styles.contentCarouselGrid}>
                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES SEEN PER YEAR</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    <Carousel.Item>
                                        <div className={styles.carouselItem}>
                                            <h3>2024</h3>
                                            <p>33</p>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>

                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES BY GENRE</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    <Carousel.Item>
                                        <div className={styles.carouselItem}>
                                            <h3>HORROR</h3>
                                            <p>67</p>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>

                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES BY RATING</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    <Carousel.Item>
                                        <div className={styles.carouselItem}>
                                            <h3>7</h3>
                                            <p>6</p>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentCarouselFlex}>
                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES BY DECADE</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    <Carousel.Item>
                                        <div className={styles.carouselItem}>
                                            <h3>90'</h3>
                                            <p>10</p>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>

                        <div className={styles.carousel}>
                            <h1 className={styles.titleCarousel}>MOVIES WATCHED PER MONTH (2024)</h1>
                            <div className={styles.carouselBorder}>
                                <Carousel>
                                    <Carousel.Item>
                                        <div className={styles.carouselItem}>
                                            <h3>SEPTEMBER</h3>
                                            <p>4</p>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </div>
                    </div>



                </div>

            </div>
        </>
    )
}
