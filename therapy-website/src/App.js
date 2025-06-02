import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This is Doctor Anton's Therapy Website
          </p>
          <a
            className="App-link"
            href="https://www.youtube.com/watch?v=Aq5WXmQQooo&ab_channel=RickRollLinks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Link to Useful Resources
          </a>
        </header>
      </div>
    </div>
  );
}

export default App;
