import React, { Suspense, lazy } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RouteLoader from './components/RouteLoader';

const Home = lazy(() => import('./pages/Home'));
const TherapyStyles = lazy(() => import('./pages/TherapyStyles'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Resources = lazy(() => import('./pages/Resources'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));




function App() {
  

  return (
    <Router>
        <div className="App">
          <Sidebar />
          <div className="main-content">
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/therapy-styles" element={<TherapyStyles />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
              </Routes>
            </Suspense>
          </div>
        </div>
    </Router>
  );
}

export default App;