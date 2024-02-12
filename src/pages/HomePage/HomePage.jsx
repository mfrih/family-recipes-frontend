import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="HomePage">
      <h2>
        Welcome to Mamette, the best app where you can store your family's most
        guarded secret: Your family's recipes!
      </h2>
      <h3>
        Create an account, invite your family members to do the same. Create and
        share your most valuable recipes with your family members.
      </h3>
      <h3>Your recipes are safe with us!</h3>
      <h4>New here? Please sign in first</h4>
      <div className="buttons-wrapper">
        <Link to={"/signup"}>
          <button>Sign up</button>
        </Link>
        <h4>Already have an account? Log in:</h4>
        <Link to={"/login"}>
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
