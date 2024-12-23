import { Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import MovieListPage from './pages/MovieListPage/MovieListPage';
import MoviePage from './pages/MoviePage/MoviePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import { Toaster } from 'react-hot-toast';
import MovieProvider from './context/MovieContext';
import AuthProvider from './context/AuthContext';
import ScrollProvider from './context/ScrollContext';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';


function App() {
  return (
    <>
      <AuthProvider>
        <ScrollProvider>
          <MovieProvider>
            <Routes>
              <Route path='/' element={<Layout />} >
                <Route index element={<MovieListPage />} />
                <Route path='details/:idMovie' element={<MoviePage />} />
                <Route path='auth' element={<AuthPage />} />
                <Route path='profile' element={<ProfilePage />} />
                <Route path='*' element={<PageNotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </MovieProvider>
        </ScrollProvider>
      </AuthProvider>

    </>
  )
}

export default App
