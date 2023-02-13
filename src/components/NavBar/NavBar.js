import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import "./NavBar.css";

const NavBar = () => {
  const { userLoggedIn, userName, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch(userActions.setUserLoggedIn(false));
    dispatch(userActions.setUserName(""));
    navigate("/");
  };

  return (
    <header className="header_container">
      <div className="navbar">
        <Link to="/posts" className="logo">
          BlogSite
        </Link>
        {userLoggedIn ? (
          <nav>
            <Link to={`/profile/${currentUser._id}`}>
              {userName.split(" ")[0]}
            </Link>
            <Link to="/create">Create New</Link>
            <span
              onClick={logOutHandler}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            >
              LogOut
            </span>
          </nav>
        ) : (
          <nav>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavBar;
