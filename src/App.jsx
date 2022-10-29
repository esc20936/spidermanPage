import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'
import { useEffect } from 'react';
import Hero from './Sections/Hero';
import About from './Sections/About';
import Movies from './Sections/Movies';
import Credits from './Sections/Credits';
function App() {



  return (
    <div className="App">
      <Hero />
      <About />
      <Movies />
      <Credits />
    </div>
  )
}

export default App
