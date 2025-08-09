import React from "react";

const BlogSection = () => {
  return (
    <div className="blog-section" style={{ 
      maxWidth: "800px", 
      margin: "0 auto", 
      padding: "40px 20px",
      textAlign: "center" 
    }}>
      <h2 style={{ 
        fontSize: "2.2rem", 
        marginBottom: "1rem",
        color: "#333"
      }}>
        Latest from Our Blog
      </h2>
      
      <p style={{ 
        fontSize: "1.1rem", 
        color: "#666", 
        marginBottom: "2rem",
        lineHeight: "1.6"
      }}>
        Read our latest insights and articles on therapy, mental health, and wellness. 
        Our blog features expert advice, research updates, and practical tips for your wellbeing journey.
      </p>
      
      {/* Simple link to your cached blog */}
      <a 
        href="https://epsilonelias.github.io/Connection/" 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          backgroundColor: "rgb(244, 170, 149)",
          color: "white",
          padding: "12px 32px",
          borderRadius: "25px",
          textDecoration: "none",
          fontSize: "1.1rem",
          fontWeight: "500",
          transition: "background-color 0.3s ease",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "rgb(234, 160, 139)"}
        onMouseOut={(e) => e.target.style.backgroundColor = "rgb(244, 170, 149)"}
      >
        Visit Our Blog →
      </a>
    </div>
  );
};

function Blogs() {
  return (
    <div className="main-content">
      {/* Top bar - same style as About.js */}
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
        <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Blog</h2>
        <p className="therapy-header-desc">
          Read articles and insights on therapy, mental health, and wellness.
        </p>
      </div>

      {/* Blog content goes here */}
      <div style={{ padding: "32px 0" }}>
        <BlogSection />
      </div>
    </div>
  );
}

export default Blogs;