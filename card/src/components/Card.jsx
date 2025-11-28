import React from "react";
function Card() {
  return (
    <div>
      <div class="grid justify-center rounded-sm border-1 white-500/100 g:text-xl lg:p-8">
        <div>
          <img src="src/images/Profile Image.png" alt="Profile Image" />
        </div>
        <h1 class="font-sf">Sophie Bennett</h1>
        <img
          src="src/images/Verification Icon Container.png"
          alt="Verification"
        />
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
