function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        About This Application
      </h2>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-gray-700 mb-4">
          This GitHub User Search Application allows you to search for GitHub
          users using the GitHub API. You can view basic user information and
          visit their GitHub profiles.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Features:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Search for GitHub users by username</li>
          <li>Filter users by location</li>
          <li>Filter users by minimum repository count</li>
          <li>View user profile information</li>
          <li>Access user repositories</li>
          <li>Link to GitHub profiles</li>
          <li>Load more results with pagination</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
