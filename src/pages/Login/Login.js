import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/userSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("please enter all the fields");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://friendly-tan-buffalo.cyclic.app/login",
        {
          email,
          password,
        },
        config
      );
      //   localStorage.removeItem("userInfo");
      if (data) {
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
      dispatch(userActions.setUserLoggedIn(true));
      dispatch(userActions.setUserName(data.name));
      dispatch(userActions.setCurrentUser(data));
      navigate("/posts");
    } catch (error) {
      const { response } = error;
      alert(response.data.message);
    }
  };
  return (
    <div className="auth_container">
      <form onSubmit={submitHandler} className="form">
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter the email address"
        />
        <input
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          placeholder="Enter the password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
