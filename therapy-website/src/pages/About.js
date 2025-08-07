import profileImg from '../face.jpg';
import profileImg2 from '../face2.jpg';

function About() {
  return (
    <div className="main-content">
      
      {/* Top red bar - using full-width-section like home page */}
      <div
        className="full-width-section"
        style={{
          background: "linear-gradient(to bottom, rgb(244, 170, 149),rgb(244, 175, 149), rgb(246, 180, 149), rgb(246, 185, 149))",
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
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>About Psycare</h2>
        <p className="therapy-header-desc">Learn more about my background, Team, and approach to therapy.</p>
      </div>

      {/* Blank space */}
      <div style={{ height: "50px" }}></div>

      {/* Squares layout starts here */}
      <div className="about-container">
        {/* Square 1: Background */}
        <section className="about-square">
          <div className="about-square-content">
            <img src={profileImg} alt="Dr. Anton Serzhan" className="about-square-image" />
            <div className="about-square-text">
              <h3>Dr. Serzhan</h3>
              <h2>Clinical Psychologist</h2>
              <p>
                I am Dr. Anton Serzhan, Psy.D (Dr. Anton) and I am a Licensed Clinical Psychologist. For years I have been working with a variety of different populations, including the veterans, LGBTQ+, injury recovery and chronic pain patients; adults of every age group, both for individual sessions and as couples. I specialize in the application of evidence-based Cognitive Behavioral Therapy (CBT), Dialectical Behavioral Therapy (DBT), Motivational Interviewing (MI),  Assertive Communication Skills (ACS), Insight Oriented Therapy (IOT), Problem-Solving Therapy (PST), Guided Breathing, Validation Therapy (VT), Acceptance and Commitment Therapy (ACT). I am here to be your guide, your resource and your support.
              </p>
              <p>
                Over the years, Anton has worked with diverse populations, always focusing on empathy and evidence-based care.
              </p>
              <p>
                With years of experience, Dr. Anton specializes in a variety of therapy styles tailored to each individual's needs.
              </p>
              <p>
                His expertise includes CBT, DBT, trauma-focused therapy, and more, always adapting to what works best for each client.
              </p>
            </div>
          </div>
        </section>

        {/* Square 2: Experience */}
        <section className="about-square">
          <div className="about-square-content reverse">
            <img src={profileImg2} alt="Therapy Session" className="about-square-image" />
            <div className="about-square-text">
              <h3>Elias</h3>
              <h2>Full Stack Web Developer/ Software Engineer</h2>
              <p>
                Elias is a full stack web developer with a passion for creating intuitive and engaging user experiences. His journey in software development began with a fascination for how technology can improve lives.
              </p>
              <p>
                With a strong foundation in both front-end and back-end technologies, Elias has worked on various projects that bridge the gap between functionality and aesthetics.
              </p>
            </div>
          </div>
        </section>

        {/* Square 3: Beliefs */}
        <section className="about-square beliefs">
          <div className="about-square-text">
            <h3>My Beliefs</h3>
            <p>
              I believe every person has the capacity for growth and healing. Therapy is a collaborative process, and I strive to create a safe, nonjudgmental space for clients to explore their thoughts and feelings.
            </p>
            <p>
              Authenticity, compassion, and respect are at the core of my practice.
            </p>
          </div>
        </section>

        {/* Square 4: Approach */}
        <section className="about-square approach">
          <div className="about-square-text">
            <h3>My Approach</h3>
            <p>
              My approach is integrative and client-centered, drawing from multiple evidence-based modalities. I tailor each session to your unique needs, focusing on practical strategies and emotional support.
            </p>
            <p>
              Together, we’ll work towards your goals, building resilience and fostering well-being.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;