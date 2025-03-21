import { useState } from 'react';
import styles from './AuthPage.module.css'
import Login from './Login/Login';
import Register from './Register/Register';
import { authContext } from '../../context/AuthContext';
import { useGenericContext } from '../../hooks/useGenericContext';


function AuthPage() {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const {reset } = useGenericContext(authContext)

  const handleAuth = () => {
    reset()
    setShowLogin(!showLogin)
  }


  return (
    <div className={styles.containerAuth}>
      <div className={styles.contentAuth}>
        <div className={styles.headerAuth}>
          <h1 className={styles.titleHeader}>Welcome  to Bmovies</h1>
          <h1 className={styles.subtitleHeader}>Save, rate and review the movies that shaped your story.</h1>
        </div>
        {showLogin ? <Login setShowLogin={handleAuth} /> : <Register setShowLogin={handleAuth} />}
      </div>
    </div>

  );
};

export default AuthPage