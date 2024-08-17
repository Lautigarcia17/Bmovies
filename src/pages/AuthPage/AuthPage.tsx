import {  useState } from 'react';
import styles from './AuthPage.module.css'
import Login from '../../components/Auth/Login/Login';
import Register from '../../components/Auth/Register/Register';


function AuthPage() {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.tittleHeader}>{showLogin ? 'Login' : 'Register'}</h1>
          <button className={styles.btnSwitch} onClick={() => setShowLogin(!showLogin)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 3l4 4l-4 4m-6-4h10M8 13l-4 4l4 4m-4-4h9"/></svg>
          
          </button>

        </div>
        <div className={styles.card}>
          {showLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>

  );
};

export default AuthPage