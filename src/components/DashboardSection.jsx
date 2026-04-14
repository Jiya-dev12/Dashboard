import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const businessData = [
  { name: "Coffee Palace", visits: 1000 },
  { name: "Fresh Eats", visits: 900 },
  { name: "The Gym Hub", visits: 800 },
  { name: "Bella Salon", visits: 700 },
  { name: "Book Nook", visits: 500 },
];

const recentActivity = [
  { user: "Sarah M.", action: "Redeemed 10% discount @ Coffee Palace", time: "2 min ago" },
  { user: "John D.", action: "Completed 5 visits @ Fresh Eats", time: "15 min ago" },
  { user: "Aisha K.", action: "New registration", time: "32 min ago" },
  { user: "Mark T.", action: "QR scan visit @ The Gym Hub", time: "45 min ago" },
  { user: "Priya S.", action: "Redeemed free coffee @ Coffee Palace", time: "1 hr ago" },
];

const DashboardSection = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left: Top Businesses by Visits */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: 0 }}>Top Businesses by Visits</h3>
        <p style={{ margin: "0 0 20px 0", color: "#777" }}>Current month</p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={businessData}
            margin={{ top: 20, right: 30, left: 40, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="visits" fill="#1E3A5F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Right: Recent Activity */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: 0 }}>Recent Activity</h3>
        <p style={{ margin: "0 0 20px 0", color: "#777" }}>Live system events</p>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {recentActivity.map((item, index) => (
            <li
              key={index}
              style={{
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <strong>{item.user}</strong> — {item.action}
              <div style={{ fontSize: "12px", color: "#999" }}>{item.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardSection;
