import './App.css';
import Sidebar from './Sidebar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TherapyStyles from './pages/TherapyStyles';
import About from './pages/About';
import Contact from './pages/Contact';
import Resources from './pages/Resources';


function App() {
  

  return (
    <Router>
        <div className="App">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/therapy-styles" element={<TherapyStyles />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;