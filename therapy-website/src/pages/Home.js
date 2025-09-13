import face from '../face.jpg';
import React, { useState, useEffect } from "react";
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

const getValidImageUrl = async (post) => {
  const possibleUrls = [
    post.featuredImage,
    post.featuredImage?.url,
    post.image?.url,
    post.thumbnail?.url,
    post.coverImage?.url,
    post.heroImage?.url
  ].filter(Boolean);

  // Add absolute URL processing
  const processedUrls = possibleUrls.map(url => {
    if (url && !url.startsWith('http')) {
      const baseUrl = 'https://dr-serzhans-psycare.onrender.com';
      return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
    return url;
  });

  // Add fallback URLs
  const fallbackUrls = [
    'https://dr-serzhans-psycare.onrender.com/api/media/file/book.png',
    'https://dr-serzhans-psycare.onrender.com/book.png',
    'https://dr-serzhans-psycare.onrender.com/api/media/file/forest.jpg',
    'https://dr-serzhans-psycare.onrender.com/forest.jpg'
  ];

  const allUrls = [...processedUrls, ...fallbackUrls];

  for (const url of allUrls) {
    console.log('🔍 Validating home page image URL:', url);
    if (await validateImageUrl(url)) {
      console.log('✅ Valid home page image URL found:', url);
      return url;
    } else {
      console.log('❌ Invalid home page image URL:', url);
    }
  }
  
  console.log('❌ No valid home page image URL found');
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
          
          // Validate image URL for the latest blog
          console.log('🖼️ Starting image validation for home page...');
          const validUrl = await getValidImageUrl(posts[0]);
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
          <div className="parallax-subtitle">Tikkun HaMoach</div>
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
            <h3 style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontSize: '26px',
              letterSpacing: '1px',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gridTemplateRows: '16px 0',
              gridGap: '22px',
              fontFamily: 'Quicksand, sans-serif',
              fontWeight: '600',
              color: '#333',
              marginBottom: '20px',
              position: 'relative'
            }}>
              <span style={{
                content: ' ',
                display: 'block',
                borderBottom: '2px solid #ccc',
                backgroundColor: '#f8f8f8'
              }}></span>
              Latest Blog
              <span style={{
                content: ' ',
                display: 'block',
                borderBottom: '2px solid #ccc',
                backgroundColor: '#f8f8f8'
              }}></span>
            </h3>
            <div className="blog-placeholder">
              {loading ? (
                <div style={{padding: "16px 0"}}>
                  <p style={{color: "#666"}}>Loading latest blog...</p>
                </div>
              ) : latestBlog ? (
                <div 
                  style={{
                    padding: "12px",
                    cursor: "pointer",
                    borderRadius: "8px",
                    transition: "all 0.2s ease",
                    backgroundColor: "white",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #e0e0e0"
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
              <p>How have you been feeling lately? If you have been feeling like something is not right, or that it is time you addressed something that has bothered you for a while, then perhaps we should talk. Whether it trauma, difficulty with mood, low self-esteem, attention, interpersonal conflicts, maladaptive habits, pain management, personality disorders you are always welcomed in.</p>
              <p>_______________________</p>
              <p>Begin your recovery by understanding your mental health using different therapy styles. Book a session now!</p>
            </div>
          </div>

          {/* Therapy activity box */}
          <div className="activity-box">
            <p>Would you like to do a therapy activity?</p>
            <button className="activity-button">
              Explore Activities
            </button>
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
        <div className="office-parallax-text">
          Learn more about me in the " About " section
        </div>
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
        <div className="office-parallax-text">
          Contact me to book a session
        </div>
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