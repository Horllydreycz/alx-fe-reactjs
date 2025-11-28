import { useState } from "react";
import { fetchUserData } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e, page = 1) => {
    if (e) e.preventDefault();

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await fetchUserData({
        username,
        location,
        minRepos,
        page,
        perPage: 10,
      });

      if (page === 1) {
        setUsers(data.items);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...data.items]);
      }

      setTotalCount(data.total_count);
      setCurrentPage(page);
    } catch {
      setError("Looks like we cant find the user");
      if (page === 1) {
        setUsers([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    handleSearch(null, currentPage + 1);
  };

  const handleReset = () => {
    setUsername("");
    setLocation("");
    setMinRepos("");
    setUsers([]);
    setError(null);
    setTotalCount(0);
    setCurrentPage(1);
    setHasSearched(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Search GitHub Users
      </h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md rounded-lg p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g., octocat"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Location Input */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., San Francisco"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Minimum Repos Input */}
          <div>
            <label
              htmlFor="minRepos"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Min Repositories
            </label>
            <input
              type="number"
              id="minRepos"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="e.g., 10"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Results Count */}
      {hasSearched && !loading && (
        <div className="mb-4 text-gray-600">
          Found {totalCount} user{totalCount !== 1 ? "s" : ""}
        </div>
      )}

      {/* Loading State */}
      {loading && currentPage === 1 && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      )}

      {/* Results Grid */}
      {!loading && users.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {user.login}
                    </h3>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm mb-2 inline-block"
                    >
                      View Profile →
                    </a>
                    <div className="text-sm text-gray-600">
                      <p>Type: {user.type}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {users.length < totalCount && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {hasSearched && !loading && users.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">
            No users found matching your criteria.
          </p>
          <p className="text-gray-500 mt-2">
            Try adjusting your search parameters.
          </p>
        </div>
      )}
    </div>
  );
}

export default Search;
