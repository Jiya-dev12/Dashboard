import bgImg from "../assets/images/bg.png";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { supabase } from "../supabase";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/Slices/HomeDataSlice";





const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const dispatch = useDispatch();

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Create Supabase Auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "student", // ✅ ya "business" jo tum chaho
            fullName: fullName,
          },
        },
      });

      if (error) {
        throw error;
      }

      const user = data.user;
      if (!user) {
        throw new Error("User was not created");
      }

      // 2. Create object for Redux
      const reduxUser = {
        id: user.id,
        email: user.email,
        role: user.user_metadata?.role,
        fullName: user.user_metadata?.fullName,
      };

      // 3. Save user to Redux
      dispatch(setUser(reduxUser));

      console.log("User saved to Redux:", reduxUser);
      alert("Signup successful!");
    } catch (error) {
      console.log("Signup error:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <>
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
          }}
        >
          {/* Left Panel (Registration Form) */}
          <form
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "400px",
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            }}
          >
            {/* Heading */}
            <h2
              style={{
                color: "#0E2A47",
                marginBottom: "5px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              SignUp
            </h2>
            <p
              style={{
                color: "#777",
                marginBottom: "20px",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              Get started with your admin panel
            </p>

            {/* Full Name */}
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
              <FaUser style={{ marginRight: "8px", color: "#1E3A5F" }} />
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required // ✅ browser validation message
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: "13px",
                }}
              />
            </div>

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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required // ✅ validation
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
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "8px",
              }}
            >
              <FaLock style={{ marginRight: "8px", color: "#1E3A5F" }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required // ✅ validation
                style={{
                  border: "none",
                  outline: "none",
                  flex: 1,
                  fontSize: "13px",
                }}
              />
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
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
              }}
            >
              Create Account
            </button>
          </form>
          {/* Right Panel (Welcome Back) */}
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

            <h2 style={{ marginBottom: "10px" }}>Welcome Back!</h2>
            <p style={{ marginBottom: "20px" }}>Already have an account?</p>
            <Link to="/">
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
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
