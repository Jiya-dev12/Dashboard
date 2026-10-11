import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

import {
  FaQrcode,
  FaGift,
  FaMapMarkerAlt,
  FaClock,
  FaEye,
  FaBell,
  FaSearch,
  FaBars,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaUser,
  FaUsers,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";

const Customer = ({ collapsed, setCollapsed }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.functions.invoke("rapid-function");

      if (error) {
        console.error("Customer fetch error:", error);
        return;
      }

      console.log("CUSTOMERS FROM SUPABASE:", data);

      const customerUsers = data?.users || [];

      const formattedCustomers = customerUsers.map((user) => {
        const meta = user.user_metadata || {};

        return {
          id: user.id,

          name: meta.full_name || meta.name || "Customer",

          email: user.email || "",

          phone: meta.phone || "-",

          membership: meta.membership || "Customer",

          joined: user.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "-",

          visits: 0,
          rewards: 0,

          favorite: "-",
          lastVisit: "-",

          connectedBusinesses: 0,

          cards: [],
          history: [],
        };
      });

      setCustomers(formattedCustomers);

      // Summary box counts
      const totalCustomers = customers.length;
      const platinumCustomers = customers.filter(
        (customer) => customer.membership === "Platinum",
      ).length;

      const goldCustomers = customers.filter(
        (customer) => customer.membership === "Gold",
      ).length;

      const totalRewards = customers.reduce(
        (total, customer) => total + Number(customer.rewards || 0),
        0,
      );
    } catch (err) {
      console.error("Customer fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalCustomers = customers.length;

  const platinumCustomers = customers.filter(
    (customer) => customer.membership === "Platinum",
  ).length;

  const goldCustomers = customers.filter(
    (customer) => customer.membership === "Gold",
  ).length;

  const totalRewards = customers.reduce(
    (total, customer) => total + Number(customer.rewards || 0),
    0,
  );

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
          <h3 style={{ margin: 0, color: "black", fontWeight: "bold" }}>
            {customers.length}
          </h3>
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
          <h3 style={{ margin: 0, color: "black", fontWeight: "bold" }}>
            {totalRewards}
          </h3>
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
              <tr key={c.id || i} style={{ borderBottom: "1px solid #eee" }}>
                {/* Customer column */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {/* Avatar circle */}
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
                      {c.name ? c.name.charAt(0) : "C"}
                    </div>

                    {/* Name + Email */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        {c.name}
                      </span>

                      <span
                        style={{
                          fontSize: "12px",
                          color: "#777",
                        }}
                      >
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
                    textAlign: "left",
                  }}
                >
                  <FaQrcode
                    style={{
                      color: "#1E3A5F",
                      marginRight: "6px",
                    }}
                  />
                  {c.visits}
                </td>

                {/* Rewards */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "left",
                  }}
                >
                  <FaGift
                    style={{
                      color: "green",
                      marginRight: "6px",
                    }}
                  />
                  {c.rewards}
                </td>

                {/* Favorite Shop */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "left",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{
                      color: "red",
                      marginRight: "6px",
                    }}
                  />

                  {c.history?.[0]?.shop || "-"}
                </td>

                {/* Last Visit */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "16px",
                    color: "#333",
                    textAlign: "left",
                  }}
                >
                  <FaClock
                    style={{
                      color: "#555",
                      marginRight: "6px",
                    }}
                  />

                  {c.history?.[0]?.date || "-"}
                </td>

                {/* View */}
                <td
                  style={{
                    padding: "12px 15px",
                    fontSize: "14px",
                    color: "#1E3A5F",
                    fontWeight: "bold",
                    textAlign: "right",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedCustomer(c)}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaEye />
                    View
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
              width: "1100px",
              height: "700px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              fontFamily: "Arial, sans-serif",
              overflowY: "auto", // ✅ scroll enable
            }}
          >
            {/* Header with name only */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ margin: 0, color: "#0E2A47" }}>
                {selectedCustomer.name}'s Profile
              </h2>
            </div>
            <p style={{ color: "#777", marginTop: "4px" }}>
              Customer overview and active reward cards
            </p>

            {/* Profile section */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginTop: "20px",
                padding: "20px",
                border: "1px solid #eee",
                borderRadius: "12px",
                backgroundColor: "#fafafa",
              }}
            >
              {/* Avatar circle */}
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "24px",
                  flexShrink: 0,
                }}
              >
                {selectedCustomer.name.charAt(0)}
              </div>

              {/* Details grid */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* First row: Name, Email, Phone */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <FaUser style={{ color: "#1E3A5F" }} />
                    <span>
                      <b>Name:</b> {selectedCustomer.name}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <FaEnvelope style={{ color: "#1E3A5F" }} />
                    <span>
                      <b>Email:</b> {selectedCustomer.email}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <FaPhone style={{ color: "#1E3A5F" }} />
                    <span>
                      <b>Phone:</b> {selectedCustomer.phone}
                    </span>
                  </div>
                </div>

                {/* Second row: Joined, Visits, Rewards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <FaCalendarAlt style={{ color: "#1E3A5F" }} />
                    <span>
                      <b>Joined:</b> {selectedCustomer.joined}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <FaQrcode style={{ color: "#1E3A5F" }} />
                    <span>
                      <b>Total Visits:</b> {selectedCustomer.visits}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "8px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <FaGift style={{ color: "green" }} />
                    <span>
                      <b>Rewards Claimed:</b> {selectedCustomer.rewards}
                    </span>
                  </div>
                </div>

                {/* Extra info section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center", // ✅ horizontally center
                    gap: "40px",
                    marginTop: "10px",
                    width: "100%",
                  }}
                >
                  {/* Favorite */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaMapMarkerAlt
                      style={{ color: "red", fontSize: "18px" }}
                    />
                    <span style={{ color: "#333", fontSize: "14px" }}>
                      <b>Favorite:</b> {selectedCustomer.favorite}
                    </span>
                  </div>

                  {/* Last Visit */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaClock style={{ color: "#555", fontSize: "18px" }} />
                    <span style={{ color: "#333", fontSize: "14px" }}>
                      <b>Last Visit:</b> {selectedCustomer.lastVisit}
                    </span>
                  </div>

                  {/* Connected Businesses */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <FaUsers style={{ color: "#1E3A5F", fontSize: "18px" }} />
                    <span style={{ color: "#333", fontSize: "14px" }}>
                      <b>Connected with:</b>{" "}
                      {selectedCustomer.connectedBusinesses} businesses
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Reward Cards Section */}
            <div style={{ marginTop: "30px" }}>
              <h3 style={{ color: "#1E3A5F", marginBottom: "15px" }}>
                Active Reward Cards ({selectedCustomer.cards?.length || 0})
              </h3>

              <div
                style={
                  selectedCustomer.name === "Aisha Khan"
                    ? {
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }
                    : selectedCustomer.name === "Sarah Mitchell"
                      ? {
                          display: "flex",
                          gap: "20px",
                          flexWrap: "nowrap", // ✅ ek hi row me rakhega
                          overflowX: "auto", // ✅ agar screen chhoti ho to scroll ho jayega
                        }
                      : {
                          display: "flex",
                          gap: "20px",
                          flexWrap: "wrap",
                        }
                }
              >
                {selectedCustomer.cards &&
                  selectedCustomer.cards.map((card, index) => (
                    <div
                      key={index}
                      style={{
                        borderRadius: "12px",
                        padding: "27px",
                        backgroundColor: card.bgColor || "#1E3A5F",
                        color: "#fff",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",

                        // ✅ Sarah ke liye wider cards
                        flex:
                          selectedCustomer.name === "Sarah Mitchell"
                            ? "0 0 326px"
                            : "1 1 280px",
                        minHeight:
                          selectedCustomer.name === "Sarah Mitchell"
                            ? "240px"
                            : "auto",
                      }}
                    >
                      {card.type.toLowerCase() === "point" ? (
                        <>
                          {/* Point Card UI */}
                          <div
                            style={{ fontWeight: "bold", marginBottom: "8px" }}
                          >
                            POINT CARD
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "600",
                              marginBottom: "6px",
                            }}
                          >
                            {card.business}
                          </div>
                          <div
                            style={{ fontSize: "14px", marginBottom: "10px" }}
                          >
                            Reward: {card.reward}
                          </div>

                          {/* Progress Tracker */}
                          <div style={{ marginTop: "15px" }}>
                            <div
                              style={{ fontSize: "14px", marginBottom: "6px" }}
                            >
                              Visits required: {card.visitsRequired}
                            </div>
                            {/* ✅ Yahan tumhari line use hoti hai */}
                            <div
                              style={{
                                display: "flex",
                                gap: "6px",
                                flexWrap: "wrap",
                              }}
                            >
                              {[...Array(card.visitsRequired)].map((_, i) => (
                                <div
                                  key={i}
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    backgroundColor:
                                      i < card.progress
                                        ? card.circleColor
                                        : "transparent",
                                    color:
                                      i < card.progress
                                        ? "#fff"
                                        : card.circleColor,
                                    border: `1px solid ${card.circleColor}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                            <div style={{ marginTop: "6px", fontSize: "12px" }}>
                              {card.progress} / {card.visitsRequired} pts
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Amount Card UI */}
                          <div
                            style={{ fontWeight: "bold", marginBottom: "8px" }}
                          >
                            AMOUNT CARD
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "600",
                              marginBottom: "6px",
                            }}
                          >
                            {card.business}
                          </div>
                          <div
                            style={{ fontSize: "14px", marginBottom: "10px" }}
                          >
                            Reward: {card.reward}
                          </div>

                          {/* Earned / Redeemed / Balance */}
                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              marginTop: "10px",
                            }}
                          >
                            <div
                              style={{
                                flex: 1,
                                backgroundColor: card.earnedColor || "#4CAF50", // ✅ dynamic
                                padding: "8px",
                                borderRadius: "6px",
                                textAlign: "center",
                              }}
                            >
                              <div>Earned</div>
                              <div>{card.earned || "Rs 0"}</div>
                            </div>

                            <div
                              style={{
                                flex: 1,
                                backgroundColor:
                                  card.redeemedColor || "#F44336", // ✅ dynamic
                                padding: "8px",
                                borderRadius: "6px",
                                textAlign: "center",
                              }}
                            >
                              <div>Redeemed</div>
                              <div>{card.redeemed || "Rs 0"}</div>
                            </div>

                            <div
                              style={{
                                flex: 1,
                                backgroundColor: card.balanceColor || "#2196F3", // ✅ dynamic
                                padding: "8px",
                                borderRadius: "6px",
                                textAlign: "center",
                              }}
                            >
                              <div>Balance</div>
                              <div>{card.balance || "Rs 0"}</div>
                            </div>
                          </div>

                          {/* Expiry */}
                          <div style={{ marginTop: "12px", fontSize: "12px" }}>
                            Expires Sep 30, 2026
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              style={{
                marginTop: "20px",
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
      )}
    </div>
  );
};

export default Customer;
