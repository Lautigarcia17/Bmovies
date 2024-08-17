import { Routes, Route, useNavigate } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import { useEffect } from 'react'
import { supabase } from './supabase/client'
import MovieListPage from './pages/MovieListPage/MovieListPage';
import MoviePage from './pages/MoviePage/MoviePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Toaster } from 'react-hot-toast';
import MovieProvider from './context/MovieContext';


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const response = await supabase.auth.getSession();
      if (response.data.session === null) {
        navigate('auth');
      }
    }
    fetchSession();
  }, [])


  return (
    <>
      <MovieProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<MovieListPage />} />
            <Route path='details/:idMovie' element={<MoviePage />} />
            {/* <Route path='profile' element={<ProfilePage />} /> */}
            <Route path='auth' element={<AuthPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
        <Toaster />
      </MovieProvider>
    </>
  )
}

export default App
