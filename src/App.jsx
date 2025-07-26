import './App.css'
import Loginin from './Pages/Login/Loginin'
import HomePage from './Pages/HomePage/HomePage'
import { Route, Routes } from 'react-router'
import Book from './Pages/Book/Book'
import Detalis from './Pages/MyDetails/Detalis'
import Layout from './Pages/Layout/Layout'
import News from './Pages/News/News.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx'
function App() {

  return (
    <>
      <Routes>
        <Route path='/loginin' element={<Loginin />} />
        <Route path='/' element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>} >
          <Route index element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />
          <Route path='/book' element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>} />
          <Route path='/news' element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>} />
          <Route path='/details' element={
            <ProtectedRoute>
              <Detalis />
            </ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
