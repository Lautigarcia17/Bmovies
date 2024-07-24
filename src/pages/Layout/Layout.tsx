
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/NavBar/NavBar';
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={styles.content}>
      <Navbar />
        <Outlet /> 
    </div>
  );
};

export default Layout;