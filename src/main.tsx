import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout/Layout.tsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx'
import MoviePage from './pages/MoviePage/MoviePage.tsx'
import PageNotFound from './pages/PageNotFound/PageNotFound.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListPage from './pages/MovieListPage/MovieListPage.tsx'
import AuthPage from './pages/AuthPage/AuthPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <MovieListPage /> },
      { path: 'details/:idMovie', element: <MoviePage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'auth', element: <AuthPage /> },
    ],
  },
  { path: '*', element: <PageNotFound /> },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
