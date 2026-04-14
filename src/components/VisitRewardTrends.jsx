import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { month: "Jan", visits: 1200, rewards: 400 },
  { month: "Feb", visits: 1800, rewards: 500 },
  { month: "Mar", visits: 1600, rewards: 450 },
  { month: "Apr", visits: 2200, rewards: 600 },
  { month: "May", visits: 2000, rewards: 650 },
  { month: "Jun", visits: 2800, rewards: 700 },
  { month: "Jul", visits: 3000, rewards: 800 },
];

const pieData = [
  { name: "Redeemed", value: 38 },
  { name: "Pending", value: 45 },
  { name: "Expired", value: 17 },
];

const COLORS = ["#1E3A5F", "#FF8C00", "#999999"];

const DashboardCharts = () => {
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
      {/* Left: Line Chart */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Visit & Reward Trends</h3>
            <p style={{ margin: 0, color: "#777" }}>Monthly overview for 2024</p>
          </div>
          <div style={{ color: "green", fontWeight: "bold" }}>↑ +12.4%</div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="visits" stroke="#1E3A5F" strokeWidth={3} />
            <Line type="monotone" dataKey="rewards" stroke="#28a745" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Right: Donut Chart */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ margin: 0 }}>Reward Status</h3>
        <p style={{ margin: "0 0 20px 0", color: "#777" }}>
          Distribution of all rewards
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
