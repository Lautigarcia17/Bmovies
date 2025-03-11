
import NavBar from '../components/NavBar/NavBar';
import styles from './Layout.module.css'
import { Outlet, useLocation } from 'react-router-dom';
import { useGenericContext } from '../hooks/useGenericContext';
import { scrollContext } from '../context/ScrollContext';
import { useEffect } from 'react';



function Layout() {
  const { scrollRef, setScrollPosition } = useGenericContext(scrollContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollPosition(scrollRef.current.scrollTop);
      }
    };

    if (scrollRef.current && location.pathname === '/') {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [location, scrollRef, setScrollPosition]);




  return (
    <div className={styles.content} ref={scrollRef}>
      <NavBar/>
      <Outlet />
    </div>
  );
};

export default Layout;