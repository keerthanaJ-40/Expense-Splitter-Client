import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose, onLoginSuccess, onCreateAccount }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
     console.log("Connecting to:", process.env.REACT_APP_API_URL); 
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Accept":"application/json"
         },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
        return;

      }
       const data = await response.json();
      console.log("Backend Success Data:", data);

      alert("Login Successful 🎉");
      onLoginSuccess();
      onClose();
      navigate("/add-expense");
    }
    catch(error){
      console.error("Login Error:",error);
      alert("Server Not Connected");
    }
  };

  return (
    <section className="modal-overlay">
      <div className="modal-box">
        <form className="form1" onSubmit={handleSubmit}>
          {/* Close */}
          <button type="button" className="close-icon1" onClick={onClose}>
            &times;
          </button>

          <h1 className="form-name1">Welcome Back 👋</h1>
          <p className="subtitle">Login to manage your expenses</p>

          <div className="form-input1">
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button type="submit" className="login-btn">
              Log In
            </button>

            {/* CENTER LINK */}
            <div className="account-center">
              <p className="link" onClick={onCreateAccount}>
                Create new account
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
