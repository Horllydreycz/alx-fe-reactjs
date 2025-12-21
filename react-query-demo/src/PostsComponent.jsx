import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

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

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Posts from API</h2>
      <p>
        Last updated:{" "}
        {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "Never"}
      </p>
      <button onClick={() => refetch()} disabled={isFetching}>
        {isFetching ? "Refetching..." : "Refetch Data"}
      </button>
      <div>
        {data.slice(0, 12).map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px 0",
            }}
          >
            <h3>
              Post #{post.id} - {post.title}
            </h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <p>Showing 12 of {data.length} total posts</p>
    </div>
  );
}

export default PostsComponent;
