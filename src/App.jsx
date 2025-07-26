import './App.css'
import Loginin from './Pages/Login/Loginin'
import HomePage from './Pages/HomePage/HomePage'
import { Route, Routes } from 'react-router'
import Book from './Pages/Book/Book'
import Detalis from './Pages/MyDetails/Detalis'
import Layout from './Pages/Layout/Layout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/loginin' element={<Loginin />} />

        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/book' element={<Book />} />
          <Route path='/details' element={<Detalis />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
