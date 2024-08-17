
import NavBar from '../../components/NavBar/NavBar';
import styles from './Layout.module.css'
import {Outlet} from 'react-router-dom';



function Layout(){


  return (
    <div className={styles.content}>
      <NavBar />
      <Outlet /> 
    </div>
  );
};

export default Layout;