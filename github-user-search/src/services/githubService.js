import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

/**
 * Advanced search for GitHub users
 */
export const searchUsers = async ({
  username = "",
  location = "",
  minRepos = "",
  page = 1,
  perPage = 10,
}) => {
  try {
    // Build query string
    let query = [];

    if (username) query.push(`${username} in:login`);
    if (location) query.push(`location:${location}`);
    if (minRepos) query.push(`repos:>=${minRepos}`);

    const queryString = query.length > 0 ? query.join(" ") : "type:user";

    const url = "https://api.github.com/search/users";

    const config = {
      params: {
        q: queryString,
        page,
        per_page: perPage,
      },
    };

    if (API_KEY) {
      config.headers = {
        Authorization: `token ${API_KEY}`,
      };
    }

    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

/**
 * Get detailed information about a specific user
 */
export const getUserDetails = async (username) => {
  try {
    const url = `https://api.github.com/users/${username}`;

    const config = {};
    if (API_KEY) {
      config.headers = {
        Authorization: `token ${API_KEY}`,
      };
    }

    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
