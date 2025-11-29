function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-8 max-w-sm mx-auto, my-20 rounded-lg shadow-lg">
      <img
        src="https://via.plac eholder.com/150"
        alt="User"
        className="img rounded-full w-36 h-36 mx-auto"
      />
      <h1 className="head text-xl text-blue-800 m">John Doe</h1>
      <p className="paragraph text-gray-600 text-base">
        Developer at Example Co. Loves to write code and explore new
        technologies.
      </p>
    </div>
  );
}
export default UserProfile;
