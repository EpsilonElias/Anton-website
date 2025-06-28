import React, { useState, useEffect } from "react";
import "../TherapyStyles.css";

const therapyStyles = [
  { title: "Cognitive Behavioral Therapy", desc: "CBT helps you manage problems by changing the way you think and behave.", color: "#4F46E5" },
  { title: "Psychodynamic Therapy", desc: "Focuses on unconscious processes as they are manifested in a person's present behavior.", color: "#059669" },
  { title: "Humanistic Therapy", desc: "Emphasizes people's capacity to make rational choices and develop to their maximum potential.", color: "#7C3AED" },
  { title: "Gestalt Therapy", desc: "Focuses on the present moment and personal responsibility.", color: "#DC2626" },
  { title: "Existential Therapy", desc: "Centers on free will, self-determination, and the search for meaning.", color: "#D97706" },
];

function TherapyStyles() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const total = therapyStyles.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prev = () => setCurrent((current - 1 + total) % total);
  const next = () => setCurrent((current + 1) % total);

  const getCardStyle = (idx) => {
    const angle = (360 / total) * (idx - current);
    const radius = isMobile ? 200 : 400;
    return {
      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      opacity: Math.abs(angle) > 90 ? 0.15 : 1,
      zIndex: 100 - Math.abs(angle),
      background: `linear-gradient(135deg, ${therapyStyles[idx].color} 0%, ${therapyStyles[idx].color}CC 100%)`
    };
  };

  return (
    <div>
      <div className="full-width-section therapy-header-section">
        <h2>Therapy Styles</h2>
        <p className="therapy-header-desc">
          Explore different therapy styles I offer. Use the arrows to learn more.
        </p>
      </div>

      <div className="carousel3d-wrapper">
        {/* Desktop Arrows */}
        {!isMobile && (
          <button className="carousel-arrow left" onClick={prev}>&lt;</button>
        )}

        <div className="carousel3d-perspective">
          <div className="carousel3d">
            {therapyStyles.map((style, idx) => (
              <div
                key={style.title}
                className="carousel3d-card"
                style={getCardStyle(idx)}
              >
                <h3>{style.title}</h3>
                <p>{style.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {!isMobile && (
          <button className="carousel-arrow right" onClick={next}>&gt;</button>
        )}

        {/* Mobile Arrows */}
        {isMobile && (
          <div className="carousel-arrows-mobile">
            <button className="carousel-arrow left" onClick={prev}>&lt;</button>
            <button className="carousel-arrow right" onClick={next}>&gt;</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TherapyStyles;
