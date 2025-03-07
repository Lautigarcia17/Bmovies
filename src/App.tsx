import { Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import { Toaster } from 'react-hot-toast';
import MovieProvider from './context/MovieContext';
import AuthProvider from './context/AuthContext';
import ScrollProvider from './context/ScrollContext';
import { Suspense } from 'react';
import { MovieListPage, MoviePage, ProfilePage } from './lazyRoutes';
import AuthPage from './pages/AuthPage/AuthPage';
import NotFound from './pages/NotFound/NotFound';
import { Spinner } from 'react-bootstrap';


function App() {
  return (
    <>
      <AuthProvider>
        <ScrollProvider>
          <MovieProvider>
            <Suspense fallback={
              <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', marginTop: '4em'}}>
                <Spinner animation="border" variant="light" />

              </div>
              
              }>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<MovieListPage />} />
                  <Route path="details/:idMovie" element={<MoviePage />} />
                  <Route path="auth" element={<AuthPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
            <Toaster />
          </MovieProvider>
        </ScrollProvider>
      </AuthProvider>

    </>
  )
}

export default App
