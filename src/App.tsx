import React from 'react';
import Quiz from './components/Quiz';
import './App.css';

const App = () => {
  return(
    <div className="container text-center mt-5">
      <h1 className='mb-4 font-weight-bold'><i className="fas fa-laptop-code"></i> Programming Quiz</h1>
      <Quiz/>
    </div>
    
  )
}

export default App;
