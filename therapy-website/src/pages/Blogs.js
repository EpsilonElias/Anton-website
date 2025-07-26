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
        // Fetch only published posts from your Payload API
        const response = await fetch(`${API_BASE}/api/posts?where[status][equals]=published&sort=-publishedDate`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data.docs);
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
    return <div className="blog-loading">Loading blog posts...</div>;
  }

  if (error) {
    return <div className="blog-error">Error loading posts: {error}</div>;
  }

  if (posts.length === 0) {
    return <div className="blog-empty">No blog posts found.</div>;
  }

  return (
    <div className="blog-container">
      <div className="blog-posts">
        {posts.map((post) => (
          <article
            key={post.id}
            className="blog-post"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/blogs/${post.id}`)}
          >
            <h2>{post.title}</h2>
            {post.excerpt && <p className="blog-excerpt">{post.excerpt}</p>}
            <div className="blog-content">
              {post.content && (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </div>
            <div className="blog-meta">
              <small>
                Published: {new Date(post.publishedDate).toLocaleDateString()}
              </small>
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
        <p className="about-header-desc">
          Read articles and insights on therapy, mental health, and wellness.
        </p>
      </div>

      {/* Blog content goes here */}
      <div style={{ padding: "32px 0" }}>
        <BlogList />
      </div>
    </div>
  );
}

export default Blogs;