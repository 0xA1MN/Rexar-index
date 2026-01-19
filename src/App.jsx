import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Reporting from './pages/Reporting'
import Company from './pages/Company'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/company" element={<Company />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
