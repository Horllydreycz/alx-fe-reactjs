import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { createPost } from "./api";

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: true,
      },
    },
  });
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setTitle("");
      setBody("");
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ title, body, userId: 1 });
  };

  return (
    <div className="border p-4 rounded shadow mb-6 bg-white">
      <h3 className="text-xl font-bold mb-4">Create New Post</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="w-full px-3 py-2 border rounded mb-3"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post content"
        rows={4}
        className="w-full px-3 py-2 border rounded mb-3"
      />

      <button
        onClick={handleSubmit}
        disabled={mutation.isPending || !title || !body}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {mutation.isPending ? "Creating..." : "Create Post"}
      </button>

      {mutation.isSuccess && (
        <div className="mt-3 p-3 bg-green-100 text-green-800 rounded">
          Post created! ID: {mutation.data?.id}
        </div>
      )}

      {mutation.isError && (
        <div className="mt-3 p-3 bg-red-100 text-red-800 rounded">
          Error: {mutation.error?.message}
        </div>
      )}
    </div>
  );
}
export default CreatePostForm;
