

import Layout from './pages/Layout/Layout'
import {Routes,Route, useNavigate} from 'react-router-dom'


import {AuthPage,ProfilePage,PageNotFound,MovieListPage, MoviePage} from './pages/index'
import { useEffect } from 'react'
import { supabase } from './supabase/client'


function App() {
  const navigate = useNavigate();

  useEffect(()=>{

    const fetchSession = async ()=>{
      const response = await supabase.auth.getSession();
      if(response.data.session === null){
        navigate('auth');
      }
    }
    fetchSession();
  },[])


  return (
    <>
        <Routes>
          <Route path='/' element={<Layout/>} >
            <Route index element={<MovieListPage/>}/>
            <Route path='details/:idMovie' element={<MoviePage /> }/>
            <Route path='profile' element={<ProfilePage /> }/>
            <Route path='auth' element={<AuthPage /> }/>
            <Route path='*' element={<PageNotFound/>}/>
          </Route>
        </Routes>
    </>
  )
}

export default App
