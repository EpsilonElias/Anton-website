import face from '../face.jpg';
import { Instagram } from 'lucide-react';

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
  }}
>
  {/* <div className="parallax-corner-text"></div>       this is for the text in the corner top                 */}
  <h1 className="parallax-title">For a Happier and Secure Future</h1>
</div>

      {/* Blank space */}
      <div style={{ height: "100px" }}></div>

      {/* Your existing hero block */}
      <header
        className="App-header hero-block"
        style={{
          backgroundImage: `url(${face})`,
          backgroundPosition: '70% 30%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="block-content">
          
        </div>
      </header>

      {/* Blank space */}
<div style={{ height: "100px" }}></div>
<div
  style={{
    minHeight: "400px", // or whatever height you want for the white area
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }}
>
  <div className="block-text">
    
    <p>How have you been feeling lately? If you have been feeling like something is not right, or that it is time you addressed something that has bothered you for a while, then perhaps we should talk. Whether it trauma, difficulty with mood, low self-esteem, attention, interpersonal conflicts, maladaptive habits, pain management, personality disorders you are always welcomed in. </p>
    
    <p>Begin your recovery by understanding your mental health using different therapy styles. Book a session now!</p>
  </div>
</div>

      {/* Parallax book image at the bottom */}
      <div
        className="parallax-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/forest.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "750px", // Adjust as needed
        }}
      >
        <div className="office-parallax-text">
    Learn more about me in the " About " section
  </div>
</div>
      
      {/* Another parallax section with a different image */}
      <div
  className="parallax-section"
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/office.jpg)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "750px",
  }}
>
  <div className="office-parallax-text">
    Contact me to book a session
  </div>
</div>
      
      {/* Solid red section with text */}
      <div
  className="full-width-section"
  style={{
    background: "linear-gradient(to bottom,rgb(244, 184, 149),rgb(243, 214, 154))",
    color: "white",
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  }}
>
  <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Los Angeles</h2>
  {/*
<a
  href="https://www.instagram.com/psych.center2020/"
  target="_blank"
  rel="noopener noreferrer"
  className="instagram-btn"
>
  <Instagram size={24} />
</a> */}
</div>
    </>
  );
}

export default Home;