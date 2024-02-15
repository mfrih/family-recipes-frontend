import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const { logOutUser, isLoggedIn, user } = useContext(AuthContext);
  return (
    <header>
      <nav className="NavBar">
        <img
          className="nav-logo"
          src="/cassoles_tajines_long_logo.png"
          alt="cassoles et tajines logo"
        />
        <div className="username-authbuttons">
          {!isLoggedIn ? (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <p>{user.username}</p>
              <button onClick={logOutUser}>Logout</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
