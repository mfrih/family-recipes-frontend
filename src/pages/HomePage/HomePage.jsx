import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="HomePage">
      <h2 className="text-content">Welcome to "Cassoles et Tajines".</h2>
      <h3>A place where every flavor tells a story.</h3>
      <h4>
        "Cassoles et Tajines" let you store your family's most guarded secret:
        Your family's recipes!
      </h4>
      <h4>New to our community? Let's get started!</h4>
      <div className="buttons-wrapper">
        <Link to={"/signup"}>
          <button>Join Now</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
