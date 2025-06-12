import boni from '../boni.jpg'; // adjust the path if needed

function Home() {
  return (
    <header
      className="App-header hero-block"
      style={{
        backgroundImage: `url(${boni})`,
        backgroundPosition: '50% 10%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="block-content">
        <div className="block-text">
          <h2>For a Happier and Secure Future</h2>
          <p>Everyone deals with challenges in life, its what makes us human. You are not alone in your fight with mental health.</p>
          <p>Begin your recovery by understanding your mental health using different therapy styles. Book a session now!</p>
        </div>
      </div>
    </header>
  );
}

export default Home;