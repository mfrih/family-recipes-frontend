import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const { logOutUser, isLoggedIn, user } = useContext(AuthContext);
  return (
    <header className="NavBar">
      <Link to="/">Logo</Link>
      <nav>
        {!isLoggedIn ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <p>Welcome {user.username}</p>
            <Link to="/welcome">Your Home</Link>
            <button onClick={logOutUser}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
