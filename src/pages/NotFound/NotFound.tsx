import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'



function NotFound() {

    return (
        <>
            <div className={styles.containerNotFound}>
                <div className={styles.contentNotFound}>
                    <div className={styles.textNotFound}>
                        <h1>This page is not available.</h1>
                        <h2>The link you selected may not work or the page may have been removed. <Link to='/' className={styles.linkToBack}>Back to BMOVIES</Link></h2>
                    </div>
                </div>
            </div>


        </>
    )
}

export default NotFound