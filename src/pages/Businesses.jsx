import {
  FaBell,
  FaSearch,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaStar,
  FaBars
} from "react-icons/fa";

import React, { useState } from "react";

const Businesses = ({ collapsed, setCollapsed }) => {
  const [showModal, setShowModal] = useState(false); // ✅ modal toggle state
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [menuIndex, setMenuIndex] = useState(null);

  const businessData = [
    ["Coffee Palace", "Café", "Downtown", "842", "4.8", "3", "Active"],
    ["Fresh Eats", "Restaurant", "Midtown", "720", "4.5", "2", "Inactive"],
    ["The Gym Hub", "Fitness", "Uptown", "615", "4.7", "4", "Active"],
    ["Bella Salon", "Beauty", "Westside", "530", "4.6", "1", "Active"],
    [ "Burger World", "Restaurant ", "Eastside", "410", "4.4", "0", "Inactive"],
    ["Tech Fix Pro", "Services", "Northside", "280", "4.2", "2", "Active"],
    ["Tea House", "Cafe", "Downtown", "660", "4.9", "3", "Active"],
    ["Glow Spa", "Beauty", "Midtown", "390", "4.3", "1", "Inactive"],
  ];

  // ✅ Filter logic
  const filteredData =
    filterStatus === "All Status"
      ? businessData
      : businessData.filter((row) => row[6] === filterStatus);


  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      
      {/* Header */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  }}
>
  {/* Left side: Bars + Search */}
  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
    {/* Sidebar toggle (hamburger) */}
    <button
      onClick={() => setCollapsed(!collapsed)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "#1E3A5F",
        fontSize: "22px",
      }}
    >
      <FaBars />
    </button>

    {/* Search bar */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f1f3f4",
        borderRadius: "20px",
        padding: "6px 12px",
        width: "600px",
        gap: "8px",
      }}
    >
      <FaSearch style={{ color: "#555", fontSize: "14px" }} />
      <input
        type="text"
        placeholder="Search..."
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          width: "100%",
          fontSize: "14px",
          color: "#555",
        }}
      />
    </div>
  </div>

  {/* Right side: bell + profile */}
  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <div style={{ position: "relative" }}>
      <FaBell style={{ fontSize: "20px", color: "#1E3A5F" }} />
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
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        A
      </div>
      <div style={{ textAlign: "left" }}>
        <b>Admin</b>
        <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
          Super Admin
        </p>
      </div>
    </div>
  </div>
</div>


        {/* Page Heading */}
        <div style={{ padding: "20px 30px 10px 30px" }}>
          <h1
            style={{
              color: "#0E2A47",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Business Management
          </h1>
          <p style={{ color: "#717070", marginBottom: "12px" }}>
            Manage all registered businesses and their profiles.
          </p>
        </div>

        {/* Top Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 30px",
            marginBottom: "30px",
          }}
        >
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            {/* Search bar with icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "12px 12px",
                width: "930px",
              }}
            >
              {/* Proper search icon */}
              <FaSearch
                style={{ color: "#555", marginRight: "8px", fontSize: "16px" }}
              />

              <input
                type="text"
                placeholder="Search businesses..."
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  width: "100%",
                  fontSize: "16px",
                  color: "#555",
                }}
              />
            </div>

            {/* Dropdown */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: "12px 12px",
                border: "1px solid #ddd",
                fontSize: "16px",
                color: "black",
              }}
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Add Business Button */}
          <button
            onClick={() => setShowModal(true)} // ✅ open modal
            style={{
              background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            + Add Business
          </button>
        </div>

        {/* ✅ Modal Popup */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "12px",
                width: "500px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <h2 style={{ marginBottom: "20px", color: "#0E2A47" ,fontSize:"24px"}}>
                Add New Business
              </h2>

              <input
                type="text"
                placeholder="Business Name e.g. Coffee Palace"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              />
              <select
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              >
                <option>Select Category</option>
                <option>Café</option>
                <option>Restaurant</option>
                <option>Retail</option>
                <option>Services</option>
              </select>
              <input
                type="text"
                placeholder="Location e.g. Downtown"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              />
              <input
                type="email"
                placeholder="Contact Email e.g. owner@business.com"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              />
              <input
                type="text"
                placeholder="Phone e.g. +1 (555) 000-0000"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              />

              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setShowModal(false)} // ✅ close modal
              >
                Add Business
              </button>
            </div>
          </div>
        )}

        {/* Summary Boxes */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            padding: "0 30px 30px 30px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: 0, color: "#0E2A47", fontWeight: "bold" }}>
              8
            </h3>
            <p style={{ margin: 0, color: "#717070" }}>Total</p>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: 0, color: "green", fontWeight: "bold" }}>5</h3>
            <p style={{ margin: 0, color: "#717070" }}>Active</p>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: 0, color: "red", fontWeight: "bold" }}>3</h3>
            <p style={{ margin: 0, color: "#717070" }}>Inactive</p>
          </div>

          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: 0, color: "#0E2A47", fontWeight: "bold" }}>
              4,447
            </h3>
            <p style={{ margin: 0, color: "#717070" }}>Total Visits</p>
          </div>
        </div>

        {/* ✅ Business Table */}
        <div style={{ padding: "0 30px 30px 30px" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f1f3f4", textAlign: "left" }}>
                {[
                  "Business",
                  "Category",
                  "Location",
                  "Visits",
                  "Rating",
                  "Offers",
                  "Status",
                  "",
                ].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "12px 15px",
                      fontSize: "18px",
                      color: "#0E2A47",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{ padding: "12px 15px", fontSize: "18px" }}
                    >
                      {j === 1 ? (
                        <span
                          style={{
                            border: "1px solid #ddd",
                            borderRadius: "20px",
                            padding: "4px 10px",
                            backgroundColor: "#f9f9f9",
                            fontSize: "14px",
                          }}
                        >
                          {cell}
                        </span>
                      ) : j === 2 ? (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <FaMapMarkerAlt style={{ color: "#1E3A5F" }} /> {cell}
                        </span>
                      ) : j === 4 ? (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <FaStar style={{ color: "gold" }} /> {cell}
                        </span>
                      ) : j === 6 ? (
                        <span
                          style={{
                            borderRadius: "20px",
                            padding: "4px 12px",
                            backgroundColor:
                              cell === "Active" ? "#E6F4EA" : "#FDECEA",
                            color: cell === "Active" ? "green" : "red",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}

                  {/* ✅ 3 dots menu */}
                  <td
                    style={{
                      padding: "12px 15px",
                      textAlign: "center",
                      cursor: "pointer",
                      fontSize: "18px",
                      color: "#999",
                      position: "relative",
                    }}
                    onClick={() => setMenuIndex(menuIndex === i ? null : i)}
                  >
                    ⋮
                    {menuIndex === i && (
                      <div
                        style={{
                          position: "absolute",
                          top: "40px",
                          right: "10px",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          zIndex: 10,
                          width: "120px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            cursor: "pointer",
                            color: "#333",
                          }}
                        >
                          <FaEdit
                            style={{ marginRight: "8px", color: "#1E3A5F" }}
                          />{" "}
                          Edit
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            cursor: "pointer",
                            color: "red",
                          }}
                        >
                          <FaTrash style={{ marginRight: "8px" }} /> Remove
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

  );
};

export default Businesses;
