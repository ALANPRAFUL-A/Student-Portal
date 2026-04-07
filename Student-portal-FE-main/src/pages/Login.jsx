// Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5500/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", res.data.token);
      onLogin({
        ...res.data.student,
        token: res.data.token,
      });

      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="loginform">
      <h2 className="loginheading">Login</h2>
      <form onSubmit={handleLogin} className="login-form">

        {/* Input field for Email */}
        <div className="input-group">
          <input
            className="logininput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            // Placeholder removed
          />
          <label className={email ? "active" : ""}>Email</label>
        </div>

        {/* Input field for Password */}
        <div className="input-group">
          <input
            className="logininput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            // Placeholder removed
          />
          <label className={password ? "active" : ""}>Password</label>
        </div>

        <button type="submit" className="submitbutton">Login</button>
      </form>
    </div>

  );
}

export default Login;