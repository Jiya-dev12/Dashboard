import bgImg from "../assets/images/bg.png";
import { Link } from "react-router-dom";
// adjust path if needed
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";

const Login = () => {
   const [email, setEmail] = useState("admin@smartvisit.com"); // email field
  const [showPassword, setShowPassword] = useState(false);    // password toggle
  const [password, setPassword] = useState("");       
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Card Container */}
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "500px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        {/* Left Panel */}
        <div
          style={{
            flex: 1,
            background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <img
            src={bgImg}
            alt="Login Illustration"
            style={{
              width: "90%", // adjust width percentage
              height: "auto", // keeps aspect ratio
              maxHeight: "100%", // prevents overflow
              objectFit: "contain",
            }}
          />

          <h2 style={{ marginBottom: "10px" }}>Hello, Welcome!</h2>
          <p style={{ marginBottom: "20px" }}>Don't have an account?</p>
          <Link to="/signup">
            <button
              style={{
                padding: "10px 25px",
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              SignUp
            </button>
          </Link>
        </div>

        {/* Right Panel (Login Form) */}
        <div
          style={{
            flex: 1,
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <div style={{ width: "100%", maxWidth: "300px" }}>
            <h2
              style={{
                color: "#0E2A47",
                marginBottom: "10px",
                fontWeight: "bold",
                 textAlign: "center", 
              }}
            >
             Login
            </h2>
            <p
              style={{ color: "#777", marginBottom: "20px", fontSize: "13px" ,  textAlign: "center", }}
            >
              Login to access your admin panel
            </p>

           
        {/* Email */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "8px",
          }}
        >
          <FaEnvelope style={{ marginRight: "8px", color: "#1E3A5F" }} />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "13px",
            }}
          />
        </div>

        {/* Password */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "8px",
          }}
        >
          <FaLock style={{ marginRight: "8px", color: "#1E3A5F" }} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: "13px",
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              cursor: "pointer",
              marginLeft: "8px",
              color: "#1FA2C9",
              fontSize: "16px",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Forgot Password (Right Side) */}
        <div style={{ textAlign: "right", marginBottom: "15px" }}>
          <p
            style={{
              cursor: "pointer",
              color: "#012840",
              fontWeight: "500",
              fontSize: "12px",
              margin: 0,
            }}
          >
            Forgot Password?
          </p>
        </div>

        {/* Sign In Button */}
        <Link to="/AdminHome">
          <button
            style={{
              padding: "10px",
              width: "100%",
              background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            Login
          </button>
        </Link>

       
         
      
      </div>
    </div>
    </div>
   </div>
  );
};

export default Login;