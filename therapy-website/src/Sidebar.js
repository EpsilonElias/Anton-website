import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react'; // <-- Add this import

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
    </nav>
  );
}

export default Sidebar;