import boni from '../boni.jpg';

function Home() {
  return (
    <>
      {/* Parallax CG image at the top */}
       <div
      className="parallax-section"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/CG.png), linear-gradient(red, yellow)`,
        height: "850px",
        minHeight: "300px",
        /*width: "100vw",*/
      }}
    >
      <h2 style={{ color: "#fff", textShadow: "0 0 20px #000" }}>Dr. Anton Serzhan Therapy</h2>
    </div>

      {/* Blank space */}
      <div style={{ height: "100px" }}></div>

      {/* Your existing hero block */}
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

      {/* Blank space */}
      <div style={{ height: "800px" }}></div>

      {/* Parallax book image at the bottom */}
      <div
        className="parallax-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/book.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "750px", // Adjust as needed
        }}
      >
        {/* Optional overlay content */}
      </div>
    </>
  );
}

export default Home;