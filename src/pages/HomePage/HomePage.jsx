import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="HomePage">
      <div className="cover-image">
        <img src="/epices.jpg" alt="" />
        <div className="homepage-tagline">
          <h2>Welcome to Cassoles & Tajines</h2>
          <h3>A place where every flavor tells a story.</h3>
          <h4>
            Store and share your family's most guarded secret: Your family
            recipes!
          </h4>
          <p>New to our community? Let's get started!</p>
          <div className="buttons-wrapper">
            <Link to={"/signup"}>
              <button>Join Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
