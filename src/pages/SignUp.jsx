import bgImg from "../assets/images/bg.png";
// adjust path if needed
import React from "react";

const SignUp = () => {
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
          <div
            style={{
              flex: 1,
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "40px",
            }}
          >
            <h2
              style={{
                color: "#0E2A47",
                marginBottom: "20px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Registration
            </h2>

            {/* Username */}
            <div style={{ marginBottom: "12px" }}>
              <input
                type="text"
                placeholder="Enter your user name"
                style={{
                  padding: "9px", // smaller input
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
              />
            </div>
            {/* Username */}
            <div style={{ marginBottom: "12px" }}>
              <input
                type="text"
                placeholder="Enter your email"
                style={{
                  padding: "9px", // smaller input
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
              />
            </div>
            {/* Username */}
            <div style={{ marginBottom: "12px" }}>
              <input
                type="text"
                placeholder="Create password"
                style={{
                  padding: "9px", // smaller input
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "13px",
                }}
              />
            </div>

            <button
              style={{
                padding: "10px", // smaller button
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
              Register
            </button>
            <p
              style={{
                marginTop: "10px",
                color: "#555",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              or register with social platforms
            </p>

            {/* Social Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                style={{
                  padding: "7px 16px",
                  borderRadius: "5px",
                  border: "none",
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
              </button>

              <button
                style={{
                  padding: "7px 16px",
                  borderRadius: "5px",
                  border: "none",
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </button>

            </div>
          </div>

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
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
