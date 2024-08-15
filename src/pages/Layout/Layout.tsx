
import NavBar from '../../components/NavBar/NavBar';
import styles from './Layout.module.css'
import {Outlet} from 'react-router-dom';



function Layout(){


  return (
    <div className={styles.content}>
      <header>
        <NavBar />
      </header>        
      <main>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;