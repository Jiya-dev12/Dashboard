import React from "react";

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left: Search Bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
          style={{ color: "#555" }}
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 
          1.415-1.414l-3.85-3.85zm-5.242.656a5.5 5.5 0 1 1 
          0-11 5.5 5.5 0 0 1 0 11z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "20px",
            outline: "none",
            width: "600px",
          }}
        />
      </div>

      {/* Right: Notification + Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ position: "relative" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
            style={{ color: "#555", cursor: "pointer" }}
          >
            <path
              d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 
            2zm.995-14.9a1 1 0 0 0-1.99 0A5.002 
            5.002 0 0 0 3 6c0 1.098-.402 
            2.005-1.2 2.7-.3.27-.8.7-.8 
            1.3h14c0-.6-.5-1.03-.8-1.3C13.4 
            8.005 13 7.098 13 6a5.002 5.002 
            0 0 0-4.005-4.9z"
            />
          </svg>
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              backgroundColor: "red",
              borderRadius: "50%",
            }}
          ></span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: "#1E3A5F",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            A
          </div>
          <div style={{ lineHeight: "1.2" }}>
            <strong>Admin</strong>
            <div style={{ fontSize: "12px", color: "#777" }}>Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
