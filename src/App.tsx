import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import { Toaster } from 'react-hot-toast';
import MovieProvider from './context/MovieContext';
import AuthProvider from './context/AuthContext';
import ScrollProvider from './context/ScrollContext';
import { Suspense } from 'react';
import { MovieListPage, MoviePage, ProfilePage } from './lazyRoutes';
import AuthPage from './pages/AuthPage/AuthPage';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';


function App() {
  return (
    <>
      <AuthProvider>
        <ScrollProvider>
          <MovieProvider>
            <Suspense
              fallback={<LoadingSpinner/>}
            >
              <Routes>
                <Route path="/" element={<Layout />}>
                  {/* Protected routes */}
                  <Route element={<ProtectedRoute redirectTo="/auth" requireAuth={true} />}>
                    <Route index element={<MovieListPage />} />
                    <Route path="details/:idMovie" element={<MoviePage />} />
                    <Route path="profile" element={<ProfilePage />} />
                  </Route>

                  {/* Authentication path (non-authentication) */}
                  <Route element={<ProtectedRoute redirectTo="/" requireAuth={false} />}>
                    <Route path="auth" element={<AuthPage />} />
                  </Route>

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
