import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import MultiStepForm from './pages/MultiStepForm';
import './App.css'; // Make sure you import the CSS file

function App() {
  return (
    <div className="app-container">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/multiform" element={<MultiStepForm />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
       
      </Router>
    </div>
  );
}

export default App;
