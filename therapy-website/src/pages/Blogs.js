import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from '../api';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error('Failed to fetch blog data');
        const data = await response.json();
        setPosts(data.posts || data); // Use 'posts' array or root array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "40px", 
        fontSize: "1.1rem",
        color: "#666" 
      }}>
        Loading blog posts...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "40px", 
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <div style={{
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px"
        }}>
          <h3 style={{ color: "#856404", marginBottom: "10px" }}>
            Blog temporarily unavailable
          </h3>
          <p style={{ color: "#856404", lineHeight: "1.5" }}>
            We're experiencing a technical issue with our blog service. 
            Our team is working to resolve this as quickly as possible.
          </p>
        </div>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: "rgb(244, 170, 149)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer"
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "40px", 
        fontSize: "1.1rem",
        color: "#666" 
      }}>
        No blog posts found.
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: "900px", 
      margin: "0 auto", 
      padding: "0 20px" 
    }}>
      <div style={{ 
        display: "grid", 
        gap: "30px",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" 
      }}>
        {posts.map((post, index) => (
          <article
            key={post.id || index}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "24px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e0e0e0",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/blogs/${post.id}`)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            }}
          >
            <h2 style={{
              fontSize: "1.5rem",
              marginBottom: "12px",
              color: "#333",
              lineHeight: "1.3"
            }}>
              {post.title}
            </h2>
            {post.excerpt && (
              <p style={{
                color: "#666",
                marginBottom: "16px",
                lineHeight: "1.6",
                fontSize: "1rem"
              }}>
                {post.excerpt}
              </p>
            )}
            {post.content && (
              <div style={{
                color: "#555",
                lineHeight: "1.6",
                marginBottom: "16px",
                fontSize: "0.95rem"
              }}>
                <div dangerouslySetInnerHTML={{ 
                  __html: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '')
                }} />
              </div>
            )}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "1px solid #e0e0e0"
            }}>
              <small style={{ color: "#888" }}>
                {post.publishedDate ? 
                  new Date(post.publishedDate).toLocaleDateString() : 
                  post.date ? new Date(post.date).toLocaleDateString() : 
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
          </article>
        ))}
      </div>
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
      <div style={{ padding: "40px 0" }}>
        <BlogList />
      </div>
    </div>
  );
}

export default Blogs;