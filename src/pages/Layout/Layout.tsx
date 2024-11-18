
import NavBar from '../../components/NavBar/NavBar';
import styles from './Layout.module.css'
import {Outlet} from 'react-router-dom';
import { useGenericContext } from '../../hooks/useGenericContext';
import { scrollContext } from '../../context/ScrollContext';



function Layout(){
  const {scrollRef} = useGenericContext(scrollContext);

  return (
    <div className={styles.content} ref={scrollRef}>
      <NavBar/>
      <Outlet/> 
    </div>
  );
};

export default Layout;