import { useNavigate } from 'react-router-dom';
import { Menu, Instagram, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

function Sidebar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth > 600) {
        setIsOpen(false); // Close mobile menu when switching to desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false); // Close menu after navigation on mobile
    }
  };

  return (
    <nav className={`sidebar ${isMobile && isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-menu-icon" onClick={toggleMobileMenu}>
        <Menu size={28} className="sidebar-menu-svg" />
      </div>
      
      {/* Dropdown container for mobile */}
      <div className="sidebar-dropdown">
        <button onClick={() => handleNavigation('/')}>Home</button>
        <button onClick={() => handleNavigation('/therapy-styles')}>Therapy Styles</button>
        <button onClick={() => handleNavigation('/about')}>About</button>
        <button onClick={() => handleNavigation('/contact')}>Contact</button>
        <button onClick={() => handleNavigation('/resources')}>Resources</button>
        <button onClick={() => handleNavigation('/Blogs')}>Blog</button>
        
        {/* Social buttons */}
        <div className="sidebar-social-row">
          <a
            href="https://www.instagram.com/psych.center2020/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/elias-serzhan-720205279"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-btn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;