// Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css"

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5500/api/auth/register", form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="registerform">
      <h2 className="registerheading">Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">

        {/* Input field for Name */}
        <div className="input-group">
          <input
            className="registerinput"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            // Note: Removed placeholder attribute here
          />
          <label className={form.name ? "active" : ""}>Full Name</label>
        </div>

        {/* Input field for Email */}
        <div className="input-group">
          <input
            className="registerinput"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            // Note: Removed placeholder attribute here
          />
          <label className={form.email ? "active" : ""}>Email</label>
        </div>

        {/* Input field for Password */}
        <div className="input-group">
          <input
            className="registerinput"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            // Note: Removed placeholder attribute here
          />
          <label className={form.password ? "active" : ""}>Password</label>
        </div>

        {/* Input field for Department */}
        <div className="input-group">
          <input
            className="registerinput"
            type="text"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            // Note: Removed placeholder attribute here
          />
          <label className={form.department ? "active" : ""}>Department</label>
        </div>

        <button type="submit" className="submitbutton">Register</button>
      </form>
    </div>
  );
}

export default Register;