import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!email || !userName || !password) {
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
        "https://friendly-tan-buffalo.cyclic.app/register",
        {
          email,
          userName,
          password,
        },
        config
      );
      if (data) {
        alert("User created successfully");
        navigate("/");
      }
    } catch (error) {
      const { response } = error;
      alert(response.data.message);
    }
  };
  return (
    <div className="auth_container">
      <form onSubmit={submitHandler} className="form">
        <h2>Register</h2>
        <input
          type="text"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          placeholder="Enter Username"
        />
        <input
          type="text"
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
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
