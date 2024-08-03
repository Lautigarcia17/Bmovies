

import Layout from './pages/Layout/Layout'
import {Routes,Route} from 'react-router-dom'


import {AuthPage,ProfilePage,PageNotFound,MovieListPage, MoviePage} from './pages/index'


function App() {

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
