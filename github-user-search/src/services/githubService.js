import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";
const API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

// Create axios instance with default config
const githubAPI = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  headers: API_KEY ? { Authorization: `token ${API_KEY}` } : {},
});

// Function to search for GitHub users
export const searchUsers = async (username) => {
  try {
    const response = await githubAPI.get(`/search/users?q=${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to get a specific user's details
export const getUserDetails = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};
