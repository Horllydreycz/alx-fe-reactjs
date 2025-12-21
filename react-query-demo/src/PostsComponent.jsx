import React from "react";
import { useQuery } from "@tanstack/react-query";

// Fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

// Posts Component with React Query
function PostsComponent() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : "Never";

  // Loading State
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{ marginBottom: "16px" }}>⏳</div>
        <p style={{ color: "#666", fontSize: "18px" }}>Loading posts...</p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{ marginBottom: "16px" }}>❌</div>
        <p
          style={{
            color: "#dc2626",
            fontSize: "18px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          Error Loading Posts
        </p>
        <p style={{ color: "#666", marginBottom: "16px" }}>{error.message}</p>
        <button
          onClick={() => refetch()}
          style={{
            padding: "8px 24px",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Success State - Display Posts
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header with cache status and refetch button */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "24px",
          marginBottom: "24px",
          border: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "8px",
              }}
            >
              Posts from API
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                color: "#6b7280",
              }}
            >
              <span>🕐</span>
              <span>Last updated: {lastUpdated}</span>
              {isFetching && (
                <span
                  style={{
                    color: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <span>🔄</span>
                  Updating...
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: isFetching ? "#93c5fd" : "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: isFetching ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            <span>🔄</span>
            Refetch Data
          </button>
        </div>

        {/* Cache Info */}
        <div
          style={{
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <span>✅</span>
            <div style={{ fontSize: "14px", color: "#166534" }}>
              <p style={{ fontWeight: "600", marginBottom: "4px" }}>
                React Query Caching Active
              </p>
              <p>
                Data is cached and will be served instantly on revisit. Navigate
                away and come back to see caching in action!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {data.slice(0, 12).map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "20px",
              border: "1px solid #e5e7eb",
              transition: "box-shadow 0.2s",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#2563eb",
                  backgroundColor: "#dbeafe",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                Post #{post.id}
              </span>
              <span style={{ fontSize: "12px", color: "#6b7280" }}>
                User {post.userId}
              </span>
            </div>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {post.title}
            </h3>
            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {post.body}
            </p>
          </div>
        ))}
      </div>

      {/* Total count */}
      <div style={{ textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
        Showing 12 of {data.length} total posts
      </div>
    </div>
  );
}

export default PostsComponent;
