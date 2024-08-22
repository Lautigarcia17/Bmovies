import { Link, NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import logo from '../../assets/Bmovie-removebg-preview.png'
import { authContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { useGenericContext } from "../../hooks/useGenericContext";


function NavBar() {
    const { session, signOut } = useGenericContext(authContext)

    const handleLogout = async () => {
        await signOut();
        toast.success(`You have logged out, see you later !!`, { position: 'top-right', duration: 3000 })
    }


    return (
        <>
            <div className={styles.content}>
                {session && (
                    <>
                        <div className={styles.logo}>
                            <Link to='/'>
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>
                        <div className={styles.element}>
                            <button className={styles.btnNav}><NavLink to='/' className={({ isActive }) => `${styles.link} ${isActive ? styles.btnWhite : ''}`}> Home</NavLink></button>
                            <button className={styles.btnNav} onClick={handleLogout}>
                                <NavLink to='/auth' className={styles.link}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z" /></svg>
                                </NavLink>
                            </button>
                            {/* <button className={styles.btnNav}>
                                    <NavLink to= '/profile'className={({ isActive }) => `${styles.link} ${isActive ? styles.btnWhite : ''}`}> 
                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.iconProfile} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076A9.959 9.959 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.958 9.958 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22a9.947 9.947 0 0 0 5.675-1.765a10.055 10.055 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clipRule="evenodd"/></svg>
                                    </NavLink>
                                </button>  */}
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

export default NavBar