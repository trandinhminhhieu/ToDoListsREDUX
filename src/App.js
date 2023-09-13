import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Todos from './components/Todos';

const App = () => {
  return (
    <div className='App'>
      <Navbar />
      <Todos />
    </div>
  )
}

export default App;
