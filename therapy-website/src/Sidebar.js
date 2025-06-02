


function Sidebar() {
  return (
    <nav className="sidebar">
      <button onClick={() => window.location.href = '/'}>Home</button>
      <button onClick={() => window.location.href = '/about'}>About</button>
      <button onClick={() => window.location.href = '/contact'}>Contact</button>
      {/* Add more buttons as needed */}
    </nav>
  );
}

export default Sidebar;