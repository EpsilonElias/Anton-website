import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { API_BASE } from '../api';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(API_BASE);
        if (!response.ok) throw new Error('Failed to fetch blog data');
        const data = await response.json();
        const posts = data.posts || data;
        const found = Array.isArray(posts) ? posts.find(p => String(p.id) === String(id)) : null;
        setPost(found || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "400px",
        fontSize: "1.2rem",
        color: "#666"
      }}>
        Loading blog post...
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "400px",
        fontSize: "1.2rem",
        color: "#d32f2f"
      }}>
        Error: {error}
      </div>
    );
  }
  
  if (!post) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "400px",
        fontSize: "1.2rem",
        color: "#666"
      }}>
        Blog post not found.
      </div>
    );
  }

  return (
    <div className="main-content">
      {/* Top bar with gradient - consistent with other pages */}
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
          padding: "48px 20px 24px 20px",
          position: "relative"
        }}
      >
        {/* Back button in top left */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "50%",
            padding: "12px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
          onMouseOut={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
          aria-label="Go back"
        >
          <Undo2 size={24} color="#fff" />
        </button>

        <h1 style={{ 
          fontSize: "2.2rem", 
          marginBottom: "1rem",
          maxWidth: "800px",
          lineHeight: "1.2"
        }}>
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p style={{ 
            fontSize: "1.1rem", 
            opacity: "0.9",
            maxWidth: "600px",
            lineHeight: "1.5"
          }}>
            {post.excerpt}
          </p>
        )}
      </div>

      {/* Blog content */}
      <div style={{ 
        maxWidth: "800px", 
        margin: "0 auto", 
        padding: "40px 20px" 
      }}>
        <article style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          lineHeight: "1.7"
        }}>
          <div style={{
            fontSize: "1.1rem",
            color: "#333"
          }}>
            {post.content ? (
              typeof post.content === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <div style={{ color: "#666", fontStyle: "italic" }}>
                  Content format not supported for display. Please contact the administrator.
                </div>
              )
            ) : (
              <div style={{ color: "#666", fontStyle: "italic" }}>
                No content available for this post.
              </div>
            )}
          </div>
          
          <div style={{
            marginTop: "40px",
            paddingTop: "20px",
            borderTop: "1px solid #e0e0e0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <small style={{ color: "#888", fontSize: "0.95rem" }}>
              Published: {post.publishedDate ? 
                new Date(post.publishedDate).toLocaleDateString() : 
                post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 
                'Date not available'
              }
            </small>
            
            <button
              onClick={() => navigate('/blogs')}
              style={{
                backgroundColor: "rgb(244, 170, 149)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s ease"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "rgb(234, 160, 139)"}
              onMouseOut={(e) => e.target.style.backgroundColor = "rgb(244, 170, 149)"}
            >
              ← Back to Blog
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default BlogDetail;