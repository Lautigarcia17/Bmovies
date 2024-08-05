
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom';
import {NavBar} from '../../components';
import styles from './Layout.module.css'
// import {supabase} from '../../supabase/client'
// import { useEffect } from 'react';

const Layout = () => {
  // const navigate : NavigateFunction = useNavigate();

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     const { data,error} = await supabase.auth.getUser();
  //     if (!data.user || error) {
  //       navigate('auth');
  //     }
  //   };
  //   verifyAuth();
  // }, [navigate]);

  return (
    <div className={styles.content}>
        <NavBar />
        <Outlet /> 
    </div>
  );
};

export default Layout;