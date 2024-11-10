import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TodosPage from './components/TodosPage/TodosPage';
import AddDoPage from './components/AddDoPage/AddDoPage';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<TodosPage />} />
          <Route path='/add' element={<AddDoPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
