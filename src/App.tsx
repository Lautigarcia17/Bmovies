import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import { Toaster } from 'react-hot-toast';
import MovieProvider from './context/MovieContext';
import AuthProvider from './context/AuthContext';
import ProfileProvider from './context/ProfileContext';
import ScrollProvider from './context/ScrollContext';
import { Suspense } from 'react';
import { MovieListPage, MoviePage, ProfilePage, PublicProfilePage, ProfileSettingsPage } from './lazyRoutes';
import AuthPage from './pages/AuthPage/AuthPage';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProfileProvider>
          <ScrollProvider>
            <MovieProvider>
              <Suspense
                fallback={<LoadingSpinner/>}
              >
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route element={<ProtectedRoute redirectTo="/auth" requireAuth={true} />}>
                      <Route index element={<MovieListPage />} />
                      <Route path="details/:idMovie" element={<MoviePage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="profile/settings" element={<ProfileSettingsPage />} />
                      <Route path=":username" element={<PublicProfilePage />} />
                    </Route>

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
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
