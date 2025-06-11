


function Sidebar() {
  return (
    <nav className="sidebar">
      <button onClick={() => window.location.href = '/'}>Blank</button>
      <button onClick={() => window.location.href = '/'}>Therapy Styles</button>
      <button onClick={() => window.location.href = '/about'}>About</button>
      <button onClick={() => window.location.href = '/contact'}>Contact</button>
    </nav>
  );
}

export default Sidebar;