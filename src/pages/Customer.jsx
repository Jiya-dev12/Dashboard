import React, { useState } from "react";

import {
  FaQrcode,
  FaGift,
  FaMapMarkerAlt,
  FaClock,
  FaEye,
  FaBell,
  FaSearch,
} from "react-icons/fa";

const Customer = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const customers = [
    {
      name: "Sarah Mitchell",
      email: "sarah@email.com",
      visits: 47,
      rewards: 3,
      joined: "Jan 2024",
      history: [
        { shop: "Coffee Palace", date: "Mar 26, 2026", reward: "10% Discount" },
        { shop: "Fresh Eats", date: "Mar 24, 2026" },
        { shop: "Coffee Palace", date: "Mar 22, 2026", reward: "Free Drink" },
        { shop: "The Gym Hub", date: "Mar 20, 2026" },
        {
          shop: "Bella Salon",
          date: "Mar 18, 2026",
          reward: "20% Off Next Visit",
        },
      ],
    },
    {
      name: "John Doe",
      email: "john@email.com",
      visits: 32,
      rewards: 2,
      joined: "Feb 2024",
      history: [
        {
          shop: "Fresh Eats",
          date: "Mar 24, 2026",
          rewards: "Buy 1 Get 1 Meal",
        },
        { shop: "Fresh Eats", date: "Mar 24, 2026" },
        { shop: "Coffee Palace", date: "Mar 22, 2026", reward: "Free Drink" },
        { shop: "The Gym Hub", date: "Mar 20, 2026" },
        {
          shop: "Bella Salon",
          date: "Mar 18, 2026",
          reward: "20% Off Next Visit",
        },
      ],
    },
    {
      name: "Aisha Khan",
      email: "aisha@email.com",
      visits: 58,
      rewards: 5,
      joined: "Mar 2024",
      history: [
        { shop: "Bella Salon", date: "Mar 22, 2026", rewards: "Free HairCut" },
        { shop: "Fresh Eats", date: "Mar 24, 2026" },
        { shop: "Coffee Palace", date: "Mar 22, 2026", reward: "Free Drink" },
        { shop: "The Gym Hub", date: "Mar 20, 2026" },
        {
          shop: "Bella Salon",
          date: "Mar 18, 2026",
          reward: "20% Off Next Visit",
        },
      ],
    },
    {
      name: "Mark Thompson",
      email: "mark@email.com",
      visits: 15,
      rewards: 0,
      joined: "Apr 2024",
      history: [
        {
          shop: "The Gym Hub",
          date: "Mar 20, 2026",
          reward: "1 Month Free Gym Pass",
        },
        { shop: "Fresh Eats", date: "Mar 24, 2026" },
        { shop: "Coffee Palace", date: "Mar 22, 2026", reward: "Free Drink" },
        { shop: "The Gym Hub", date: "Mar 20, 2026" },
        {
          shop: "Bella Salon",
          date: "Mar 18, 2026",
          reward: "20% Off Next Visit",
        },
      ],
    },
    {
      name: "Priya Singh",
      email: "priya@email.com",
      visits: 71,
      rewards: 6,
      joined: "Jan 2024",
      history: [
        {
          shop: "Coffee Palace",
          date: "Mar 26, 2026",
          reward: "Free Coffee Next Visit",
        },
        { shop: "Fresh Eats", date: "Mar 24, 2026" },
        { shop: "Coffee Palace", date: "Mar 22, 2026", reward: "Free Drink" },
        { shop: "The Gym Hub", date: "Mar 20, 2026" },
        {
          shop: "Bella Salon",
          date: "Mar 18, 2026",
          reward: "20% Off Next Visit",
        },
      ],
    },
    {
      name: "Carlos Ruiz",
      email: "carlos@email.com",
      visits: 24,
      rewards: 1,
      joined: "Feb 2024",
      history: [
        {
          shop: "Spice Garden",
          date: "Mar 24, 2026",
          reward: "30% Off Next Visit",
        },
        { shop: "Fresh Eats", date: "Mar 24, 2026" },
        { shop: "Coffee Palace", date: "Mar 22, 2026", reward: "Free Drink" },
        { shop: "The Gym Hub", date: "Mar 20, 2026" },
        {
          shop: "Bella Salon",
          date: "Mar 18, 2026",
          reward: "20% Off Next Visit",
        },
      ],
    },
    {
      name: "Emma Wilson",
      email: "emma@email.com",
      visits: 9,
      rewards: 0,
      joined: "May 2024",
      history: [
        {
          shop: "Book Nook",
          date: "Mar 18, 2026",
          reward: "Free Book with 5 Visits",
        },
        { shop: "Fresh Eats", date: "Mar 24, 2026" },
        { shop: "Coffee Palace", date: "Mar 22, 2026", reward: "Free Drink" },
        { shop: "The Gym Hub", date: "Mar 20, 2026" },
        {
          shop: "Bella Salon",
          date: "Mar 18, 2026",
          reward: "20% Off Next Visit",
        },
      ],
    },
  ];
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
        {/* Search bar with rounded icon */}
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
          <div>
            <FaSearch style={{ color: "#555", fontSize: "14px" }} />
          </div>
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
          style={{ color: "#0E2A47", marginBottom: "10px", fontWeight: "bold" }}
        >
          Customer Management
        </h1>
        <p style={{ color: "#717070" }}>
          View customer profiles, visit history, and reward status.
        </p>
      </div>

      {/* Top Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px", // ✅ 30px → 20px
          marginTop: "-10px",
          padding: "0 30px",
        }}
      >
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              padding: "12px 12px",
              width: "1250px",
            }}
          >
            <FaSearch
              style={{ color: "#555", marginRight: "8px", fontSize: "16px" }}
            />
            <input
              type="text"
              placeholder="Search customers..."
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
        </div>
      </div>

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
          <h3 style={{ margin: 0, color: "black", fontWeight: "bold" }}>7</h3>
          <p style={{ margin: 0, color: "#717070" }}>Total Customers</p>
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
          <h3 style={{ margin: 0, color: "black", fontWeight: "bold" }}>2</h3>
          <p style={{ margin: 0, color: "#717070" }}>Platinum</p>
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
          <h3 style={{ margin: 0, color: "black", fontWeight: "bold" }}>1</h3>
          <p style={{ margin: 0, color: "#717070" }}>Gold</p>
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
          <h3 style={{ margin: 0, color: "black", fontWeight: "bold" }}>17</h3>
          <p style={{ margin: 0, color: "#717070" }}>Total Rewards</p>
        </div>
      </div>

      {/* customer table */}
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
                "Customer",
                "Total Visits",
                "Rewards",
                "Favorite Shop",
                "Last Visit",
                "View",
              ].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#0E2A47",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                {/* Customer column */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "right", // ✅ thoda right
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {c.name.charAt(0)}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: "bold" }}>{c.name}</span>
                      <span style={{ fontSize: "12px", color: "#777" }}>
                        {c.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Visits */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "left", // ✅ left
                  }}
                >
                  <FaQrcode style={{ color: "#1E3A5F", marginRight: "6px" }} />{" "}
                  {c.visits}
                </td>

                {/* Rewards */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "left", // ✅ left
                  }}
                >
                  <FaGift style={{ color: "green", marginRight: "6px" }} />{" "}
                  {c.rewards}
                </td>

                {/* Favorite Shop */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "left", // ✅ keep left
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ color: "red", marginRight: "6px" }}
                  />{" "}
                  {c.history[0].shop}
                </td>

                {/* Last Visit */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "left", // ✅ thoda left
                  }}
                >
                  <FaClock style={{ color: "#555", marginRight: "6px" }} />{" "}
                  {c.history[0].date}
                </td>

                {/* View */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "14px",
                    color: "#1E3A5F",
                    fontWeight: "bold",
                    display: "flex",
                    textAlign: "right",

                    gap: "6px",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedCustomer(c)}
                >
                  <FaEye /> View
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedCustomer && (
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
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "16px",
              width: "600px",
              height: "80vh", // ✅ card lamba
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              fontFamily: "Arial, sans-serif",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                marginBottom: "6px",
                color: "#0E2A47",
                fontWeight: "bold",
              }}
            >
              {selectedCustomer.name}
            </h2>
            <p
              style={{
                margin: "0 0 12px 0",
                color: "#777",
                fontSize: "14px",
              }}
            >
              {selectedCustomer.email}
            </p>

            {/* Progress bar */}
            <label
              style={{ fontSize: "13px", color: "#555", fontWeight: "bold" }}
            >
              Loyalty Progress
            </label>
            <div
              style={{
                background: "#eee",
                borderRadius: "8px",
                overflow: "hidden",
                margin: "8px 0 15px 0",
              }}
            >
              <div
                style={{
                  width: `${(selectedCustomer.visits / 100) * 100}%`,
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  height: "12px",
                }}
              ></div>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#555",
                marginBottom: "20px",
              }}
            >
              Next tier: Keep visiting!
            </p>
            {/* Summary boxes */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "25px",
              }}
            >
              {/* Total Visits */}
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <FaQrcode
                  style={{
                    color: "#1E3A5F",
                    fontSize: "20px",
                    marginBottom: "6px",
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    color: "#0E2A47",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {selectedCustomer.visits}
                </h3>
                <p style={{ margin: 0, fontSize: "16px", color: "#777" }}>
                  Total Visits
                </p>
              </div>

              {/* Rewards */}
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <FaGift
                  style={{
                    color: "green",
                    fontSize: "20px",
                    marginBottom: "6px",
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    color: "green",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {selectedCustomer.rewards}
                </h3>
                <p style={{ margin: 0, fontSize: "16px", color: "#777" }}>
                  Rewards
                </p>
              </div>

              {/* Joined */}
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "12px",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                }}
              >
                <FaClock
                  style={{
                    color: "#555",
                    fontSize: "20px",
                    marginBottom: "6px",
                  }}
                />
                <h3
                  style={{
                    margin: 0,
                    color: "#0E2A47",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  {selectedCustomer.joined}
                </h3>
                <p style={{ margin: 0, fontSize: "16px", color: "#777" }}>
                  Joined
                </p>
              </div>
            </div>

            {/* Recent Visit History */}
            <h3 style={{ marginBottom: "10px", color: "#0E2A47" }}>
              Recent Visit History
            </h3>

            <div
              style={{
                flex: 1, // ✅ take remaining space
                overflowY: "auto", // ✅ inner scroll only
                paddingRight: "6px",
              }}
            >
              {selectedCustomer.history.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  {/* Left side: shop + date */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "bold", color: "#0E2A47" }}>
                      {h.shop}
                    </span>
                    <span style={{ fontSize: "12px", color: "#777" }}>
                      {h.date}
                    </span>
                  </div>

                  {/* Right side: reward badge */}
                  {h.reward && (
                    <span
                      style={{
                        backgroundColor: "#E6F4EA",
                        color: "green",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {h.reward}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Sticky Close button */}
            <div style={{ marginTop: "15px" }}>
              <button
                style={{
                  padding: "10px 16px",
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
