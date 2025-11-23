import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com/search/users?q";
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Create axios instance with default config
const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: API_KEY ? { Authorization: `token ${API_KEY}` } : {},
});

/**
 * Advanced search for GitHub users
 * @param {Object} params - Search parameters
 * @param {string} params.username - Username to search for
 * @param {string} params.location - Location filter
 * @param {number} params.minRepos - Minimum number of repositories
 * @param {number} params.page - Page number for pagination
 * @param {number} params.perPage - Results per page
 * @returns {Promise} - Search results
 */
export const fetchUserData = async ({
  username = "",
  location = "",
  minRepos = "",
  page = 1,
  perPage = 10,
}) => {
  try {
    // Build query string
    let queryParts = [];

    if (username) {
      queryParts.push(`${username} in:login`);
    }

    if (location) {
      queryParts.push(`location:${location}`);
    }

    if (minRepos) {
      queryParts.push(`repos:>=${minRepos}`);
    }

    // If no query parameters, search for all users
    let query = queryParts.length > 0 ? queryParts.join(" ") : "type:user";

    const response = await githubAPI.get("/search/users", {
      params: {
        q: query,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Get detailed information about a specific user
 * @param {string} username - GitHub username
 * @returns {Promise} - User details
 */
export const getUserDetails = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
