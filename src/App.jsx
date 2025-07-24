import './App.css'
import Loginin from './Pages/Login/Loginin'
import HomePage from './Pages/HomePage/HomePage'
import { Route, Routes } from 'react-router'
import Book from './Pages/Book/Book'
import Layout from './Pages/Layout/Layout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/loginin' element={<Loginin />} />

        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/book' element={<Book />} />
        </Route>


      </Routes>
    </>
  )
}

export default App
