import { useNavigate } from 'react-router-dom';
import { Menu, Instagram, Linkedin } from 'lucide-react';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <div className="sidebar-menu-icon">
        <Menu size={28} className="sidebar-menu-svg" />
      </div>

      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/therapy-styles')}>Therapy Styles</button>
      <button onClick={() => navigate('/about')}>About</button>
      <button onClick={() => navigate('/contact')}>Contact</button>
      <button onClick={() => navigate('/resources')}>Resources</button>
      <button onClick={() => navigate('/Blogs')}>Blog</button>

      {/* Social buttons at bottom */}
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
    </nav>



  );
}

export default Sidebar;
