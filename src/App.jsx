import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPosts from './components/database/AddPosts';
import { Route, Routes } from 'react-router';
import Counter from './components/data/counter';


const App = () => {

  return (

    <div>
      <Routes>
        <Route path='/' element={<AddPosts />} />
        <Route path='/counter' element={<Counter />} />
      </Routes>
    </div>
  )
}

export default App