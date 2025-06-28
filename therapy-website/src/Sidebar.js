import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <nav className="sidebar">
      <button onClick={() => navigate('/')}>Blank</button>
      <button onClick={() => navigate('/therapy-styles')}>Therapy Styles</button>
      <button onClick={() => navigate('/about')}>About</button>
      <button onClick={() => navigate('/contact')}>Contact</button>
    </nav>
  );
}

export default Sidebar;