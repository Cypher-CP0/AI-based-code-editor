import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username,
          password,
        });
  
        if (response.data.token) {
          // Save the token and username in localStorage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          navigate("/editor");
        } else {
          setError("Login failed - no token received");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Invalid username or password");
        console.error("Login Error:", err);
      }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <button onClick={() => navigate("/signup")}>Sign Up</button>
      </p>
    </div>
  );
};

export default Login;
