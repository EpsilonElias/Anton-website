import React, { useState, useEffect } from "react";
import "../TherapyStyles.css";
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';

const therapyStyles = [
  { title: "Cognitive Behavioral Therapy", desc: "CBT helps you manage problems by changing the way you think and behave.", color: "#FFB6C1" }, // Light Coral
  { title: "Psychodynamic Therapy", desc: "Focuses on unconscious processes as they are manifested in a person's present behavior.", color: "#77DDC1" }, // Muted Teal
  { title: "Humanistic Therapy", desc: "Emphasizes people's capacity to make rational choices and develop to their maximum potential.", color: "#9EEFE7" }, // Aqua Mint
  { title: "Gestalt Therapy", desc: "Focuses on the present moment and personal responsibility.", color: "#FFCBA4" }, // Apricot
  { title: "Existential Therapy", desc: "Centers on free will, self-determination, and the search for meaning.", color: "#F9C97D" }, // Honey Yellow
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
        {/* Desktop Left Arrow */}
        {!isMobile && (
          <button className="carousel-arrow left" onClick={prev}>
            <ArrowBigLeftDash size={32} />
          </button>
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

        {/* Desktop Right Arrow */}
        {!isMobile && (
          <button className="carousel-arrow right" onClick={next}>
            <ArrowBigRightDash size={32} />
          </button>
        )}

        {/* Mobile Arrows */}
        {isMobile && (
          <div className="carousel-arrows-mobile">
            <button className="carousel-arrow left" onClick={prev}>
              <ArrowBigLeftDash size={28} />
            </button>
            <button className="carousel-arrow right" onClick={next}>
              <ArrowBigRightDash size={28} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TherapyStyles;