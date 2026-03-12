import face from '../face.jpg';
import symbolLogo from '../Symbol.jpg';
import React, { useState, useEffect } from "react";
import { ContactRound, File } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { API_BASE } from '../api';

// Helper function to validate image URLs before rendering to prevent OpaqueResponseBlocking
const validateImageUrl = async (url) => {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      mode: 'no-cors'
    });
    return response.type !== 'opaque' || response.ok;
  } catch {
    return false;
  }
};

const getValidImageUrl = (post) => {
  console.log('🔍 Getting image URL for home page post:', post.title);
  
  // Check if featuredImage is a string URL
  if (typeof post.featuredImage === 'string' && post.featuredImage) {
    // If it starts with http, use it directly
    if (post.featuredImage.startsWith('http')) {
      console.log('✅ Using featuredImage URL:', post.featuredImage);
      return post.featuredImage;
    }
    // If it's a relative path, construct full URL
    const baseUrl = 'https://dr-serzhans-psycare.onrender.com';
    const fullUrl = post.featuredImage.startsWith('/') 
      ? `${baseUrl}${post.featuredImage}` 
      : `${baseUrl}/api/media/file/${post.featuredImage}`;
    console.log('✅ Constructed URL from string:', fullUrl);
    return fullUrl;
  }
  
  // Check if featuredImage is an object with URL property
  if (post.featuredImage?.url) {
    console.log('✅ Using featuredImage.url:', post.featuredImage.url);
    return post.featuredImage.url;
  }
  
  // Check other possible image fields
  const otherImageUrl = post.image?.url || post.thumbnail?.url || post.coverImage?.url || post.heroImage?.url;
  if (otherImageUrl) {
    console.log('✅ Using alternative image URL:', otherImageUrl);
    return otherImageUrl;
  }
  
  console.log('❌ No image URL found for home page post:', post.title);
  return null;
};

function Home() {
  const [latestBlog, setLatestBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validImageUrl, setValidImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestBlog = async () => {
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error('Failed to fetch blog data');
        const data = await response.json();
        const posts = data.posts || data;
        if (Array.isArray(posts) && posts.length > 0) {
          setLatestBlog(posts[0]);
          
          // Get image URL for the latest blog
          console.log('🖼️ Getting image URL for home page...');
          const validUrl = getValidImageUrl(posts[0]);
          setValidImageUrl(validUrl);
        }
      } catch (error) {
        console.error('Error fetching latest blog:', error);
        setLatestBlog(null);
      } finally {
        setLoading(false);
        setImageLoading(false);
      }
    };
    fetchLatestBlog();
  }, []);

  return (
    <>
      {/* Parallax CG image at the top */}
      <div
        className="parallax-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/background1.jpg)`,
          height: "850px",
          minHeight: "300px",
          position: "relative"
        }}
      >
        <div className="parallax-title-wrapper">
          <h1 className="parallax-title">Dr. Serzhan Psycare</h1>
          <div className="parallax-subtitle-group">
            <div className="parallax-subtitle"><em>Tikkun HaMoach</em></div>
            <img
              src={symbolLogo}
              alt="Tikkun HaMoach symbol"
              className="parallax-subtitle-logo"
            />
          </div>
        </div>
      </div>

      {/* Blank space */}
      <div style={{ height: "100px" }}></div>

      {/* New layout with face image and latest blogs side by side */}
      <div className="content-wrapper">
        <div className="face-blogs-container">
          {/* Face image - now smaller and on the left */}
          <div className="face-image-container">
            <img 
              src={face} 
              alt="Dr. Serzhan" 
              className="face-image"
            />
          </div>

          {/* Latest blogs section */}
          <div className="latest-blogs-container">
            <div style={{
              animation: 'slidingBackground 50s linear infinite',
              background: 'linear-gradient(to bottom, rgb(244, 170, 149), rgb(244, 175, 149), rgb(246, 180, 149), rgb(246, 185, 149))',
              height: '70px',
              textAlign: 'center',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              backgroundSize: '200% 200%',
              padding: '0 20px',
              margin: '0 0 30px 0'
            }}>
              <span style={{
                borderBottom: '2px solid white',
                display: 'block'
              }}></span>
              
              <h3 
                style={{
                  color: 'white',
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: '26px',
                  letterSpacing: '2px',
                  margin: '0',
                  textTransform: 'uppercase',
                  textShadow: `
                    2px 2px 4px rgba(0,0,0,0.3),
                    4px 4px 6px rgba(0,0,0,0.2),
                    6px 6px 8px rgba(0,0,0,0.1)
                  `,
                  fontWeight: '700',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
              >
                LATEST BLOG
              </h3>
              
              <span style={{
                borderBottom: '2px solid white',
                display: 'block'
              }}></span>
            </div>
            <div className="blog-placeholder">
              {loading ? (
                <div style={{padding: "16px 0"}}>
                  <p style={{color: "#666"}}>Loading latest blog...</p>
                </div>
              ) : latestBlog ? (
                <div 
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    backgroundColor: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e0e0e0",
                    width: "100%",
                    boxSizing: "border-box"
                  }}
                  onClick={() => navigate('/blogs')}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  {/* Featured Image with pre-validation to prevent OpaqueResponseBlocking */}
                  {imageLoading ? (
                    <div style={{
                      width: "100%",
                      height: "160px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                      color: "#666",
                      fontStyle: "italic",
                      borderRadius: "8px",
                      marginBottom: "12px"
                    }}>
                      Loading image...
                    </div>
                  ) : validImageUrl ? (
                    <div style={{
                      width: "100%",
                      height: "160px",
                      overflow: "hidden",
                      borderRadius: "8px",
                      marginBottom: "12px"
                    }}>
                      <img 
                        src={validImageUrl}
                        alt={latestBlog.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.2s ease"
                        }}
                        onError={(e) => {
                          console.error('❌ Even validated home page image failed:', validImageUrl);
                          e.target.parentElement.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : null}

                  <h4 style={{
                    marginBottom: "8px",
                    color: "#333",
                    fontSize: "1.2rem"
                  }}>
                    {latestBlog.title}
                  </h4>
                  
                  {latestBlog.excerpt && (
                    <p style={{
                      color: "#666",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                      marginBottom: "12px"
                    }}>
                      {latestBlog.excerpt.substring(0, 120)}
                      {latestBlog.excerpt.length > 120 ? '...' : ''}
                    </p>
                  )}
                  
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "12px"
                  }}>
                    <small style={{color: "#888"}}>
                      {latestBlog.publishedDate ? 
                        new Date(latestBlog.publishedDate).toLocaleDateString() : 
                        latestBlog.date ? new Date(latestBlog.date).toLocaleDateString() : 
                        'Recently published'
                      }
                    </small>
                    
                    <span style={{
                      color: "rgb(244, 170, 149)",
                      fontSize: "0.9rem",
                      fontWeight: "500"
                    }}>
                      Read more →
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{padding: "16px 0"}}>
                  <div style={{
                    backgroundColor: "#fff3cd",
                    border: "1px solid #ffeaa7",
                    borderRadius: "6px",
                    padding: "12px",
                    marginBottom: "12px"
                  }}>
                    <p style={{
                      color: "#856404", 
                      fontSize: "0.9rem",
                      margin: "0"
                    }}>
                      Blog service temporarily unavailable
                    </p>
                  </div>
                  <button
                    onClick={() => navigate('/blogs')}
                    style={{
                      backgroundColor: "rgb(244, 170, 149)",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "15px",
                      border: "none",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      cursor: "pointer"
                    }}
                  >
                    Visit Blog Page
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>





















        {/* Text section and activity box side by side */}
        <div className="bottom-content">
          <div className="text-section">
            <div className="block-text">
              <p>How have you been feeling lately?</p>
              <p>If something feels off — or if there's something you've been carrying for a while and you're finally ready to talk about it — you're in the right place.</p>
              <p>Whether you're navigating anxiety, depression, trauma, low self-esteem, relationship challenges, or simply trying to understand yourself better, you are always welcome here. No judgment. Just a space that's yours.</p>
              <p>_______________________</p>
              <p>Begin your recovery by understanding your mental health using different therapy styles. Book a session now!</p>
            </div>
          </div>

          {/* YouTube channel box */}
          <div className="activity-box">
            <div style={{
              animation: 'slidingBackground 50s linear infinite',
              background: 'white',
              height: '70px',
              textAlign: 'center',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '30px',
              borderRadius: '8px',
              overflow: 'hidden',
              position: 'relative',
              backgroundSize: '200% 200%',
              padding: '0 20px',
              margin: '0 0 30px 0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <span style={{
                borderBottom: '2px solid rgb(244, 170, 149)',
                display: 'block'
              }}></span>
              
              <h3 
                style={{
                  color: 'rgb(244, 170, 149)',
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: '26px',
                  letterSpacing: '2px',
                  margin: '0',
                  textTransform: 'uppercase',
                  textShadow: `
                    1px 1px 2px rgba(244, 170, 149, 0.3),
                    2px 2px 4px rgba(244, 170, 149, 0.2)
                  `,
                  fontWeight: '700',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
              >
                Latest video 
              </h3>
              
              <span style={{
                borderBottom: '2px solid rgb(244, 170, 149)',
                display: 'block'
              }}></span>
            </div>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden',
              maxWidth: '100%',
              marginBottom: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px'
                }}
                src="https://www.youtube.com/embed?listType=user_uploads&list=Mentifex-q1y"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <a 
              href="https://www.youtube.com/@Mentifex-q1y" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button className="activity-button">
                Click here for our YouTube!
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Blank space */}
      <div style={{ height: "100px" }}></div>

      {/* Parallax book image at the bottom */}
      <div
        className="parallax-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/background3.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "750px",
        }}
      >
        <button
          className="office-parallax-text office-parallax-button"
          onClick={() => navigate('/resources')}
        >
          <File className="office-parallax-icon" />
          Download our resources!
        </button>
      </div>

      {/* Another parallax section with a different image */}
      <div
        className="parallax-section"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/background2.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "750px",
        }}
      >
        <button
          className="office-parallax-text office-parallax-button"
          onClick={() => navigate('/contact')}
        >
          <ContactRound className="office-parallax-icon" />
          Book a session now!
        </button>
      </div>

      {/* Solid gradient section with text */}
      <div
        className="full-width-section"
        style={{
          background: "linear-gradient(to bottom, rgb(244, 170, 149),rgb(243, 191, 154), rgb(243, 200, 154), rgb(243, 214, 154))",
          color: "white",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "1rem",
            color: "white",
            textShadow: "0 0 2px black, 0 0 4px black"
          }}
        >Los Angeles</h2>
      </div>
    </>
  );
}

export default Home;