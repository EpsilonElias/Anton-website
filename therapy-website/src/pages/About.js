import profileImg from '../face.jpg'; // Change to your actual image path

function About() {
  return (
    <div className="main-content">
      {/* Top red bar - using full-width-section like home page */}
      <div
        className="full-width-section"
        style={{
          background: "rgb(255, 0, 0)",
          color: "white",
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          padding: "48px 20px 24px 20px"
        }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>About Dr. Anton Serzhan</h2>
        <p className="about-header-desc">Learn more about my background, experience, and approach to therapy.</p>
      </div>

      {/* Blank space */}
      <div style={{ height: "50px" }}></div>

      {/* Background section with image left, text right */}
      <header
        className="App-header hero-block"
        style={{
          backgroundImage: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
          minHeight: "400px"
        }}
      >
        <div className="block-content">
          <div className="block-image-wrapper">
            <img src={profileImg} alt="Dr. Anton Serzhan" className="block-image" />
          </div>
          <div className="block-text">
            <h2>Background</h2>
            <p>
              Dr. Anton Serzhan has a rich background in psychology, helping clients achieve their goals through personalized therapy.
            </p>
          </div>
        </div>
      </header>

      {/* Blank space */}
      <div style={{ height: "50px" }}></div>

      {/* Experience section with different background */}
      <header
        className="App-header hero-block"
        style={{
          backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          minHeight: "400px"
        }}
      >
        <div className="block-content" style={{ flexDirection: "row-reverse" }}>
          <div className="block-image-wrapper">
            <img src={profileImg} alt="Therapy Session" className="block-image" />
          </div>
          <div className="block-text">
            <h2>Experience</h2>
            <p>
              With years of experience, Dr. Anton specializes in a variety of therapy styles tailored to each individual's needs.
            </p>
          </div>
        </div>
      </header>

      {/* Blank space */}
      <div style={{ height: "50px" }}></div>

      {/* Approach section - full width text */}
      <div
        style={{
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f7f7f7",
          padding: "64px 20px"
        }}
      >
        <div className="block-text" style={{ textAlign: "center", maxWidth: "800px" }}>
          <h2>My Approach</h2>
          <p>
            I believe in a compassionate, evidence-based approach to therapy, empowering clients to overcome challenges and thrive. Every individual is unique, and I tailor my methods to meet each person's specific needs and goals.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;





