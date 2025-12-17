export const fetchPosts = async () => {
  console.log("🔄 Fetching posts from API...");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchPostById = async (postId) => {
  console.log(`🔄 Fetching post ${postId}...`);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  if (!response.ok) throw new Error("Failed to fetch post");
  return response.json();
};

export const createPost = async (newPost) => {
  console.log("📤 Creating new post...");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  return response.json();
};
