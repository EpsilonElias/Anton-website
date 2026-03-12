import React, { useState, useEffect } from "react";
import "../TherapyStyles.css";
import { ArrowBigLeftDash, ArrowBigRightDash } from 'lucide-react';
import { useSwipeable } from "react-swipeable";
import cbtImage from "../CBT.jpg";
import dbtImage from "../DBT.jpg";
import eclecticImage from "../eclectic.jpg";
import traumaImage from "../trauma.jpg";
import neuroImage from "../neuro.jpg";

const therapyStyles = [
  {
    title: "Cognitive Behavioral Therapy (CBT)",
    desc: "CBT helps you notice and challenge unhelpful thoughts, reframing them into balanced perspectives while building healthier coping strategies. It’s effective for anxiety, depression, OCD, PTSD, and self-esteem, using tools like thought records and behavioral experiments.",
    colors: ["#FFCBA4", "#F4A56B", "#F3D69A"],
    expanded: [
      {
        type: "imageRow",
        imageSrc: cbtImage,
        imageAlt: "Cognitive Behavioral Therapy",
        text: [
          "CBT helps you notice and challenge unhelpful thoughts, reframing them into balanced perspectives while building healthier coping strategies. It is effective for anxiety, depression, OCD, PTSD, and self-esteem, using tools like thought records and behavioral experiments.",
          "Sometimes our minds develop patterns of thinking that are overly negative, self-critical, or unrealistic. These patterns, often called cognitive distortions, can increase anxiety, depression, stress, or low self-esteem. CBT helps you learn how to identify these patterns, challenge them, and replace them with more balanced and helpful perspectives."
        ]
      },
      {
        type: "p",
        text: "In therapy, we work together to explore questions like:"
      },
      {
        type: "ul",
        items: [
          "What thoughts tend to show up when you feel anxious or overwhelmed?",
          "Are those thoughts completely accurate, or are they assumptions?",
          "What alternative interpretations might also be true?"
        ]
      },
      {
        type: "p",
        text: "By learning to examine and reshape these thoughts, many people experience meaningful changes in how they feel and behave."
      },
      { type: "h4", text: "What CBT Often Involves" },
      {
        type: "p",
        text: "CBT sessions are collaborative and skill-focused. Some common tools include:"
      },
      {
        type: "ul",
        items: [
          "Thought records - identifying automatic thoughts and examining the evidence for and against them",
          "Cognitive reframing - developing more balanced, realistic ways of thinking",
          "Behavioral experiments - testing beliefs in real-life situations to see what actually happens",
          "Exposure techniques - gradually facing fears in manageable steps",
          "Skill building - developing healthier coping strategies for stress and emotional regulation"
        ]
      },
      {
        type: "p",
        text: "Because CBT emphasizes learning practical tools, many clients find they gain strategies they can continue using long after therapy ends."
      },
      { type: "h4", text: "What CBT Can Help With" },
      {
        type: "p",
        text: "CBT has been extensively researched and is widely used to help with:"
      },
      {
        type: "ul",
        items: [
          "Anxiety and panic disorders",
          "Depression",
          "OCD (Obsessive-Compulsive Disorder)",
          "PTSD and trauma-related symptoms",
          "Stress and burnout",
          "Self-esteem and negative self-talk",
          "Phobias and avoidance patterns"
        ]
      },
      { type: "h4", text: "The Goal of CBT" },
      {
        type: "p",
        text: "The goal of CBT is not to force positive thinking, but to help you develop more accurate, flexible, and compassionate ways of understanding yourself and the world. Over time, these shifts in thinking can lead to healthier emotional responses and more empowering behavioral choices."
      }
    ]
  },
  {
    title: "Dialectical Behavior Therapy (DBT)",
    desc: "DBT expands on CBT by adding emotional regulation, mindfulness, and distress tolerance skills to help manage intense emotions and impulsivity. It’s helpful for relationship difficulties, BPD, and self-harm, teaching practical tools like \"STOP\" to pause and respond calmly.",
    colors: ["#FFCBA4", "#F4A56B", "#F3D69A"],
    expanded: [
      {
        type: "imageRow",
        imageSrc: dbtImage,
        imageAlt: "Dialectical Behavior Therapy",
        text: [
          "Dialectical Behavior Therapy (DBT) builds on the principles of Cognitive Behavioral Therapy (CBT) but places a stronger emphasis on managing intense emotions, developing mindfulness, and improving relationships. DBT was originally developed to support individuals who experience very strong emotional reactions or difficulty regulating emotions, but it has since become widely used for many mental health concerns.",
          "The word \"dialectical\" refers to balancing two ideas at the same time: acceptance and change. In DBT, this means learning to accept yourself and your current emotional experience while also working toward positive behavioral and emotional changes."
        ]
      },
      {
        type: "p",
        text: "Many people find DBT helpful because it provides clear, practical skills for handling overwhelming emotions and stressful situations in the moment."
      },
      { type: "h4", text: "Core Skills in DBT" },
      {
        type: "p",
        text: "DBT focuses on four main skill areas that help people navigate difficult emotions and relationships:"
      },
      {
        type: "ul",
        items: [
          "Mindfulness - staying present and aware in the current moment rather than getting caught in worries about the future or regrets about the past",
          "Emotion Regulation - understanding emotions and reducing vulnerability by recognizing triggers, increasing positive experiences, and calming the body",
          "Distress Tolerance - getting through difficult moments without making the situation worse through grounding, self-soothing, or temporary distraction",
          "Interpersonal Effectiveness - improving communication, setting boundaries, asking for what you need, and navigating conflict with respect"
        ]
      },
      { type: "h4", text: "Practical Tools You May Learn" },
      {
        type: "p",
        text: "DBT includes many simple but powerful tools that can be used in everyday life. One example is the STOP skill, which helps slow down impulsive reactions during stressful moments:"
      },
      {
        type: "ul",
        items: [
          "S - Stop: Pause before reacting",
          "T - Take a step back: Breathe and create space",
          "O - Observe: Notice your thoughts, emotions, and surroundings",
          "P - Proceed mindfully: Choose a response that aligns with your goals"
        ]
      },
      {
        type: "p",
        text: "Other techniques might include grounding exercises, breathing techniques, emotional labeling, and communication strategies that help you respond more calmly and effectively in challenging situations."
      },
      { type: "h4", text: "What DBT Can Help With" },
      {
        type: "p",
        text: "DBT has been shown to be particularly helpful for individuals experiencing:"
      },
      {
        type: "ul",
        items: [
          "Intense emotional swings",
          "Borderline Personality Disorder (BPD)",
          "Self-harm or suicidal thoughts",
          "Impulsivity and difficulty controlling reactions",
          "Relationship conflicts",
          "Anxiety, trauma, and mood disorders"
        ]
      },
      { type: "h4", text: "The Goal of DBT" },
      {
        type: "p",
        text: "The overall goal of DBT is to help people build a life that feels more stable, balanced, and meaningful. By learning how to regulate emotions, tolerate distress, and communicate more effectively, many people find they gain a stronger sense of control over their reactions and relationships."
      }
    ]
  },
  {
    title: "Eclectic Therapy",
    desc: "Eclectic therapy blends different approaches (CBT, psychodynamic, etc.) to match your unique needs, allowing flexibility in addressing complex or overlapping concerns. Sessions adapt to what works best for you, offering personalized and creative care.",
    colors: ["#FFCBA4", "#F4A56B", "#F3D69A"],
    expanded: [
      {
        type: "imageRow",
        imageSrc: eclecticImage,
        imageAlt: "Eclectic therapy",
        text: [
          "Eclectic therapy (sometimes called integrative therapy) is a flexible approach that blends techniques from multiple therapeutic styles, such as CBT, psychodynamic therapy, mindfulness-based therapy, and others, to best support your individual needs. Instead of following a single strict method, eclectic therapy focuses on what works best for you as a person.",
          "Every individual brings a unique combination of experiences, personality traits, goals, and challenges into therapy. Because of this, a one-size-fits-all approach may not always be the most effective. Eclectic therapy allows the therapist to draw from different evidence-based methods and tailor sessions to your specific concerns, preferences, and progress."
        ]
      },
      { type: "h4", text: "How Eclectic Therapy Works" },
      {
        type: "p",
        text: "In eclectic therapy, the therapist carefully selects techniques from different therapeutic approaches depending on what may be most helpful in the moment. For example:"
      },
      {
        type: "ul",
        items: [
          "CBT techniques might be used to help identify and challenge unhelpful thought patterns.",
          "Mindfulness practices may be introduced to help you stay present and regulate emotions.",
          "Psychodynamic exploration might help uncover deeper patterns shaped by past experiences.",
          "Communication and relationship skills may be practiced to improve interpersonal dynamics."
        ]
      },
      {
        type: "p",
        text: "The goal is not to combine methods randomly, but to thoughtfully integrate strategies that complement each other and support your growth."
      },
      { type: "h4", text: "What Sessions May Look Like" },
      {
        type: "p",
        text: "Because eclectic therapy is adaptive, sessions may evolve over time as your needs change. For example:"
      },
      {
        type: "ul",
        items: [
          "Early sessions might focus on understanding your goals and identifying key challenges.",
          "Later sessions may include skill-building, emotional processing, or exploring underlying patterns.",
          "Techniques may shift depending on what helps you make the most progress."
        ]
      },
      {
        type: "p",
        text: "This flexibility allows therapy to feel more personalized, responsive, and collaborative."
      },
      { type: "h4", text: "What Eclectic Therapy Can Help With" },
      {
        type: "p",
        text: "Eclectic therapy can be helpful for a wide range of concerns, including:"
      },
      {
        type: "ul",
        items: [
          "Anxiety and stress",
          "Depression and mood difficulties",
          "Relationship challenges",
          "Life transitions and personal growth",
          "Self-esteem and identity concerns",
          "Complex or overlapping emotional issues"
        ]
      },
      {
        type: "p",
        text: "Because it integrates multiple approaches, eclectic therapy can be especially helpful for people who are dealing with several interconnected challenges at once."
      },
      { type: "h4", text: "The Goal of Eclectic Therapy" },
      {
        type: "p",
        text: "The overall goal of eclectic therapy is to provide care that adapts to you, rather than expecting you to fit into a single therapeutic model. By combining different perspectives and techniques, therapy can remain flexible, creative, and focused on helping you build the tools and insight needed to improve your well-being."
      }
    ]
  },
  {
    title: "Trauma-Focused Therapy",
    desc: "Trauma-focused therapy safely helps you process and integrate traumatic experiences without becoming overwhelmed, using methods like TF-CBT, somatic techniques, or narrative work. It supports healing for PTSD, complex trauma, grief, and abuse recovery.",
    colors: ["#FFCBA4", "#F4A56B", "#F3D69A"],
    expanded: [
      {
        type: "imageRow",
        imageSrc: traumaImage,
        imageAlt: "Trauma-focused therapy",
        text: [
          "Trauma-focused therapy is designed to help individuals safely process and heal from traumatic experiences. Trauma can affect how we think, feel, and respond to the world long after the event itself has passed. Trauma-focused therapy provides a structured and supportive environment where these experiences can be explored at a pace that feels safe and manageable.",
          "A key principle of trauma-focused work is that healing does not require reliving trauma in a way that feels overwhelming. Instead, therapy focuses on gradually processing experiences while building emotional safety, coping skills, and resilience."
        ]
      },
      { type: "h4", text: "How Trauma-Focused Therapy Works" },
      {
        type: "p",
        text: "Trauma can sometimes become \"stuck\" in the mind and body, leading to symptoms such as intrusive memories, emotional numbness, hypervigilance, anxiety, or difficulty trusting others. Trauma-focused therapy helps individuals:"
      },
      {
        type: "ul",
        items: [
          "Develop tools for emotional regulation and grounding",
          "Understand how trauma may be influencing thoughts, emotions, and behaviors",
          "Process memories in a safe, structured, and supported way",
          "Rebuild a sense of safety, control, and personal empowerment"
        ]
      },
      {
        type: "p",
        text: "The therapy process is typically gradual and collaborative, ensuring that clients remain emotionally supported throughout the work."
      },
      { type: "h4", text: "Approaches Often Used in Trauma-Focused Therapy" },
      {
        type: "p",
        text: "Therapists may use several evidence-based approaches depending on the individual's needs and comfort level. These may include:"
      },
      {
        type: "ul",
        items: [
          "Trauma-Focused Cognitive Behavioral Therapy (TF-CBT) - helps individuals understand and reshape thoughts related to traumatic experiences while developing coping and emotional regulation skills",
          "Somatic Techniques - focus on how trauma is stored in the body, helping individuals notice physical sensations and learn ways to calm the nervous system",
          "Narrative Therapy - encourages individuals to explore and reframe their personal story in a way that promotes healing, resilience, and self-understanding"
        ]
      },
      {
        type: "p",
        text: "These approaches can help people integrate difficult experiences without feeling controlled by them."
      },
      { type: "h4", text: "What Trauma-Focused Therapy Can Help With" },
      {
        type: "p",
        text: "Trauma-focused therapy can support healing from many different experiences, including:"
      },
      {
        type: "ul",
        items: [
          "Post-Traumatic Stress Disorder (PTSD)",
          "Complex trauma or long-term emotional wounds",
          "Abuse or neglect",
          "Grief and loss",
          "Childhood trauma",
          "Accidents or medical trauma",
          "Witnessing or experiencing violence"
        ]
      },
      {
        type: "p",
        text: "Everyone processes trauma differently, and therapy respects that each healing journey is unique."
      },
      { type: "h4", text: "The Goal of Trauma-Focused Therapy" },
      {
        type: "p",
        text: "The goal of trauma-focused therapy is not simply to revisit painful experiences, but to help you regain a sense of safety, stability, and empowerment in your life. Over time, many people find that the memories and emotions connected to trauma become less overwhelming, allowing them to move forward with greater resilience and emotional freedom."
      }
    ]
  },
  {
    title: "Neurodivergent-Affirming Therapy",
    desc: "This therapy respects and supports neurodivergent individuals (ADHD, autism, sensory differences) without trying to \"fix\" them, focusing on strengths, accommodations, and authentic living. It offers support for executive functioning, sensory needs, and self-advocacy.",
    colors: ["#FFCBA4", "#F4A56B", "#F3D69A"],
    expanded: [
      {
        type: "imageRow",
        imageSrc: neuroImage,
        imageAlt: "Neurodivergent-affirming therapy",
        text: [
          "Neurodivergent-affirming therapy is an approach that recognizes and respects natural differences in how people think, process information, and experience the world. Rather than viewing conditions such as ADHD, autism, or sensory processing differences as problems to be \"fixed,\" this approach focuses on understanding your unique brain and supporting you in building a life that works for you.",
          "Many neurodivergent individuals grow up feeling pressured to mask their traits or fit into environments that were not designed for their needs. Neurodivergent-affirming therapy works to create a supportive space where you can explore your experiences without judgment, stigma, or pressure to change who you are."
        ]
      },
      { type: "h4", text: "What This Approach Focuses On" },
      {
        type: "p",
        text: "Instead of trying to eliminate neurodivergent traits, therapy focuses on helping individuals:"
      },
      {
        type: "ul",
        items: [
          "Understand how their brain works and what supports them best",
          "Identify personal strengths and unique ways of thinking",
          "Develop strategies for managing daily challenges",
          "Reduce shame or burnout related to masking or unmet needs",
          "Build confidence in self-advocacy and authentic expression"
        ]
      },
      {
        type: "p",
        text: "The goal is to help you work with your brain, not against it."
      },
      { type: "h4", text: "Areas of Support" },
      {
        type: "p",
        text: "Neurodivergent-affirming therapy often provides support in areas such as:"
      },
      {
        type: "ul",
        items: [
          "Executive Functioning - developing strategies for organization, planning, time management, and task initiation in ways that match your cognitive style",
          "Sensory Needs - understanding sensitivities or sensory-seeking behaviors and creating environments that feel comfortable and regulating",
          "Emotional Regulation - building tools to navigate overwhelm, burnout, or emotional intensity",
          "Self-Advocacy - learning how to communicate needs, request accommodations, and set boundaries in work, school, or relationships"
        ]
      },
      { type: "h4", text: "What Therapy May Look Like" },
      {
        type: "p",
        text: "Sessions are collaborative and tailored to the individual. Depending on your needs, therapy might include:"
      },
      {
        type: "ul",
        items: [
          "Exploring personal strengths and interests",
          "Creating practical routines and supportive systems",
          "Developing strategies for focus and energy management",
          "Discussing challenges related to masking or social expectations",
          "Processing past experiences where needs may not have been understood"
        ]
      },
      {
        type: "p",
        text: "The approach is flexible, respectful, and centered on your lived experience."
      },
      { type: "h4", text: "Who This Approach Can Support" },
      {
        type: "p",
        text: "Neurodivergent-affirming therapy may be helpful for individuals who identify with or are exploring:"
      },
      {
        type: "ul",
        items: [
          "ADHD",
          "Autism or autistic traits",
          "Sensory processing differences",
          "Giftedness or asynchronous development",
          "Neurodivergent burnout",
          "Late diagnosis or identity exploration"
        ]
      },
      {
        type: "p",
        text: "It can also support individuals who have spent years feeling misunderstood or pressured to conform to expectations that did not fit their natural ways of thinking."
      },
      { type: "h4", text: "The Goal of Neurodivergent-Affirming Therapy" },
      {
        type: "p",
        text: "The goal is to help individuals build lives that feel sustainable, authentic, and empowering. By recognizing strengths, understanding challenges, and creating supportive strategies, many people find greater self-acceptance, confidence, and well-being."
      }
    ]
  },
];




function TherapyStyles() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const [expandedIndex, setExpandedIndex] = useState(null);
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

  const openExpanded = (idx) => {
    setExpandedIndex(idx);
  };

  const closeExpanded = () => {
    setExpandedIndex(null);
  };

  const getCardStyle = (idx) => {
    const angle = (360 / total) * (idx - current);
    const radius = isMobile ? 200 : 400;

    return {
      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      opacity: isMobile
      ? (Math.abs(angle) < 1 ? 1 : 0) // on mobile: only the active card is visible
      : (Math.abs(angle) > 90 ? 0.15 : 1),
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
        {!isMobile && expandedIndex === null && (
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
        onClick={() => openExpanded(idx)}
      >
        <h3>{style.title}</h3>
        <p>{style.desc}</p>
      </div>
    ))}
  </div>
</div>

        {/* Desktop Right Arrow */}
        {!isMobile && expandedIndex === null && (
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

      {expandedIndex !== null && (
        <div className="carousel3d-expanded-overlay" onClick={closeExpanded}>
          <div
            className="carousel3d-card expanded"
            style={{
              background: `linear-gradient(135deg, ${therapyStyles[expandedIndex].colors.join(", ")})`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="carousel3d-minimize"
              onClick={closeExpanded}
            >
              Minimize
            </button>
            <h3>{therapyStyles[expandedIndex].title}</h3>
            {expandedIndex !== 0 && (
              <p>{therapyStyles[expandedIndex].desc}</p>
            )}
            {therapyStyles[expandedIndex].expanded &&
              therapyStyles[expandedIndex].expanded.map((block, idx) => {
                if (block.type === "h4") {
                  return (
                    <h4 key={idx} className="carousel3d-expanded-heading">
                      {block.text}
                    </h4>
                  );
                }
                if (block.type === "imageRow") {
                  return (
                    <div key={idx} className="carousel3d-expanded-row">
                      <img
                        src={block.imageSrc}
                        alt={block.imageAlt}
                        className="carousel3d-expanded-image"
                      />
                      <div className="carousel3d-expanded-text">
                        {block.text.map((paragraph, pIdx) => (
                          <p key={pIdx} className="carousel3d-expanded-paragraph">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (block.type === "ul") {
                  return (
                    <ul key={idx} className="carousel3d-expanded-list">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="carousel3d-expanded-paragraph">
                    {block.text}
                  </p>
                );
              })}
          </div>
        </div>
      )}

    </div>
  );
}

export default TherapyStyles;