import React, { useState, useEffect } from "react";
import "../TherapyStyles.css";
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { useSwipeable } from "react-swipeable";

const therapyStyles = [
  { title: "Cognitive Behavioral Therapy (CBT)", desc: "CBT helps you notice and challenge unhelpful thoughts, reframing them into balanced perspectives while building healthier coping strategies. It’s effective for anxiety, depression, OCD, PTSD, and self-esteem, using tools like thought records and behavioral experiments.", colors: ["#FFCBA4", "#F4A56B", "#F3D69A"] },
  { title: "Dialectical Behavior Therapy (DBT)", desc: "DBT expands on CBT by adding emotional regulation, mindfulness, and distress tolerance skills to help manage intense emotions and impulsivity. It’s helpful for relationship difficulties, BPD, and self-harm, teaching practical tools like “STOP” to pause and respond calmly.", colors: ["#FFCBA4", "#F4A56B", "#F3D69A"] },
  { title: "Eclectic Therapy", desc: "Eclectic therapy blends different approaches (CBT, psychodynamic, etc.) to match your unique needs, allowing flexibility in addressing complex or overlapping concerns. Sessions adapt to what works best for you, offering personalized and creative care.", colors: ["#FFCBA4", "#F4A56B", "#F3D69A"] },
  { title: "Trauma-Focused Therapy", desc: "Trauma-focused therapy safely helps you process and integrate traumatic experiences without becoming overwhelmed, using methods like TF-CBT, somatic techniques, or narrative work. It supports healing for PTSD, complex trauma, grief, and abuse recovery.", colors: ["#FFCBA4", "#F4A56B", "#F3D69A"] },
  { title: "Neurodivergent-Affirming Therapy", desc: "This therapy respects and supports neurodivergent individuals (ADHD, autism, sensory differences) without trying to “fix” them, focusing on strengths, accommodations, and authentic living. It offers support for executive functioning, sensory needs, and self-advocacy.", colors: ["#FFCBA4", "#F4A56B", "#F3D69A"] },
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
      background: `linear-gradient(135deg, ${therapyStyles[idx].colors.join(", ")})`
    };
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    trackMouse: false, // Only finger/touch
    preventDefaultTouchmoveEvent: true,
  });

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

        <div className="carousel3d-perspective" {...(isMobile ? handlers : {})}>
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

        {/* Mobile Arrows 
        {isMobile && (
          <div className="carousel-arrows-mobile">
            <button className="carousel-arrow left" onClick={prev}>
              <ArrowBigLeftDash size={28} />
            </button>
            <button className="carousel-arrow right" onClick={next}>
              <ArrowBigRightDash size={28} />
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default TherapyStyles;