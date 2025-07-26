import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Blog post not found.</div>;

  return (
    <div className="blog-container" style={{ position: "relative" }}>
      {/* Back button in top left */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          background: "rgba(244,170,149,0.85)",
          border: "none",
          borderRadius: "50%",
          padding: "10px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        aria-label="Go back"
      >
        <Undo2 size={28} color="#fff" />
      </button>
      <article className="blog-post">
        <h1>{post.title}</h1>
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
    </div>
  );
}

export default BlogDetail;