import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherApp from './WeatherApp';
import CityDetailPage from './CityDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/city/:cityId" element={<CityDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;