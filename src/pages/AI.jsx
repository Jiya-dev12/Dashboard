import React from "react";
import {
  FaClock,
  FaChartLine,
  FaMousePointer,
  FaUsers,
  FaBell,
  FaSearch,
  FaStar,
  FaBolt,
  FaRobot, // chatbot icon
  FaComments,
  FaBars,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const usageData = [
  { day: "Tue", queries: 150, resolved: 130 },
  { day: "Wed", queries: 180, resolved: 160 },
  { day: "Thu", queries: 240, resolved: 210 },
  { day: "Fri", queries: 260, resolved: 230 },
  { day: "Sat", queries: 140, resolved: 120 },
  { day: "Mon", queries: 120, resolved: 100 },
  { day: "Sun", queries: 100, resolved: 90 },
];

const queryData = [
  { name: "How to redeem rewards?", count: 342 },
  { name: "Find nearby offers", count: 298 },
  { name: "How does QR scanning work?", count: 214 },
  { name: "Reset my loyalty card", count: 187 },
  { name: "Business registration", count: 154 },
];

const offerData = [
  { month: "Jan", shown: 1200, clicked: 800, redeemed: 400 },
  { month: "Feb", shown: 1500, clicked: 1000, redeemed: 600 },
  { month: "Mar", shown: 1800, clicked: 1200, redeemed: 750 },
  { month: "Apr", shown: 2100, clicked: 1400, redeemed: 900 },
  { month: "May", shown: 2400, clicked: 1700, redeemed: 1100 },
  { month: "Jun", shown: 2700, clicked: 2000, redeemed: 1300 },
];

const AI = ({ collapsed, setCollapsed }) => {
  const maxCount = Math.max(...queryData.map((q) => q.count));
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

      {/* Dashboard Heading */}
      <div style={{ padding: "30px" }}>
        <h1
          style={{ marginBottom: "10px", color: "#0E2A47", fontWeight: "bold" }}
        >
          AI & Analytics
        </h1>
        <p style={{ color: "#717070", fontSize: "17px" }}>
          Monitoring chatbot performance & personalized offers.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          padding: "20px",
          marginTop: "-30px", // ✅ thoda upar shift
        }}
      >
        {/* Avg. Chatbot Response Time */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px 20px",
            borderRadius: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            minHeight: "140px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FaBolt
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#1E3A5F",
              fontSize: "24px",
            }}
          />
          <h5 style={{ marginBottom: "10px", color: "#717070" }}>
            Avg. Chatbot Response Time
          </h5>
          <p style={{ fontSize: "28px", color: "#0E2A47", fontWeight: "bold" }}>
            1.2s
          </p>
        </div>

        {/* Query Resolution Rate */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px 20px",
            borderRadius: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            minHeight: "140px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FaStar
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#1E3A5F",
              fontSize: "24px",
            }}
          />
          <h5 style={{ marginBottom: "10px", color: "#717070" }}>
            Query Resolution Rate
          </h5>
          <p style={{ fontSize: "28px", color: "#0E2A47", fontWeight: "bold" }}>
            94.8%
          </p>
        </div>

        {/* AI Offer Click-Through */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px 20px",
            borderRadius: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            minHeight: "140px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FaChartLine
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#1E3A5F",
              fontSize: "24px",
            }}
          />
          <h5 style={{ marginBottom: "10px", color: "#717070" }}>
            AI Offer Click-Through
          </h5>
          <p style={{ fontSize: "28px", color: "#0E2A47", fontWeight: "bold" }}>
            52.3%
          </p>
        </div>

        {/* Unique Chatbot Users */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px 20px",
            borderRadius: "14px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            minHeight: "140px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FaUsers
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#1E3A5F",
              fontSize: "24px",
            }}
          />
          <h5 style={{ marginBottom: "10px", color: "#717070" }}>
            Unique Chatbot Users
          </h5>
          <p style={{ fontSize: "28px", color: "#0E2A47", fontWeight: "bold" }}>
            3,840
          </p>
        </div>
      </div>
      {/* graph */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          padding: "20px 30px",
        }}
      >
        {/* Chatbot Usage This Week */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            minHeight: 400,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaMessage style={{ color: "#1E3A5F", fontSize: "20px" }} />
            <h3 style={{ marginBottom: "5px", color: "#0E2A47" }}>
              Chatbot Usage This Week
            </h3>
          </div>
          <p style={{ color: "#777", marginBottom: "20px", fontSize: "13px" }}>
            Queries received vs resolved
          </p>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="queries" fill="#1E3A5F" barSize={25} />
              <Bar dataKey="resolved" fill="#4CAF50" barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* progress bar */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            minHeight: 400,
          }}
        >
          {/* Heading with icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaComments style={{ color: "#1E3A5F", fontSize: "20px" }} />
            <h3 style={{ margin: 0, color: "#0E2A47" }}>Top Chatbot Queries</h3>
          </div>
          <p style={{ color: "#777", marginBottom: "20px", fontSize: "13px" }}>
            Most frequent user questions
          </p>

          {/* Progress bars list */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {queryData.map((q, index) => (
              <li key={index} style={{ marginBottom: "18px" }}>
                {/* Query text left + number right */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {q.name}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#0E2A47",
                    }}
                  >
                    {q.count}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    backgroundColor: "#f1f1f1",
                    borderRadius: "8px",
                    height: "14px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(q.count / maxCount) * 100}%`,
                      backgroundColor: "#1FA2C9",
                      height: "100%",
                      borderRadius: "8px",
                      transition: "width 0.5s ease",
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          minHeight: 400,
        }}
      >
        {/* Heading with icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaBolt style={{ color: "#1E3A5F", fontSize: "20px" }} />
          <h3 style={{ margin: 0, color: "#0E2A47" }}>
            AI Personalized Offers Performance
          </h3>
        </div>
        <p style={{ color: "#777", marginBottom: "20px", fontSize: "13px" }}>
          Offers Shown vs Clicked vs Redeemed
        </p>

        {/* Line Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={offerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="shown"
              stroke="#1E3A5F"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="clicked"
              stroke="#FF9800"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="redeemed"
              stroke="#4CAF50"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default AI;
