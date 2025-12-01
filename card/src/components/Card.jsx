import React from "react";
function Card() {
  return (
    <div>
      <div className="container bg-white p-8 max-w-sm mx-auto my-50 shadow-xl rounded-3xl">
        <div>
          <img
            src="src/images/Profile Image.png"
            alt="Profile Image"
            className="img w-36 h-36 mx-auto sm:h-24"
          />
        </div>
        <h1 className="head text-xl text-shadow-black my-4">
          Sophie Bennett{" "}
          <span>
            <img
              src="src/images/Verification Icon Container.png"
              alt="Verification"
            />
          </span>
        </h1>

        <p>Product Designer who focuses on simplicity & usability. </p>
        <div class="flex">
          <img
            src="src/images/Followers Container.png"
            alt="follower Container"
          />
          <img src="src/images/Projects Container.png" alt="" />
          <img src="src/images/Follow Button Container.png" alt="" />
        </div>
      </div>
    </div>
  );
}
export default Card;
