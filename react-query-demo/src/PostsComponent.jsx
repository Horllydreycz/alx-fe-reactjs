import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  RefreshCw,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

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
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading posts...</p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-600 text-lg font-semibold mb-2">
          Error Loading Posts
        </p>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Success State - Display Posts
  return (
    <div className="space-y-6">
      {/* Header with cache status and refetch button */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Posts from API
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Last updated: {lastUpdated}</span>
              {isFetching && (
                <span className="flex items-center gap-1 text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Updating...
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refetch Data
          </button>
        </div>

        {/* Cache Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div className="text-sm text-green-800">
              <p className="font-semibold mb-1">React Query Caching Active</p>
              <p>
                Data is cached and will be served instantly on revisit. Navigate
                away and come back to see caching in action!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.slice(0, 12).map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Post #{post.id}
              </span>
              <span className="text-xs text-gray-500">User {post.userId}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>
          </div>
        ))}
      </div>

      {/* Total count */}
      <div className="text-center text-gray-600 text-sm">
        Showing 12 of {data.length} total posts
      </div>
    </div>
  );
}

export default PostsComponent;
