import React from "react";
const StatCard = () => {
  const stats = [
    {
      title: "Total Customers",
      value: "12,480",
      change: "+8.2% vs last month",
      trend: "up",
      color: "green",
      icon: "👤",
    },
    {
      title: "Active Businesses",
      value: "184",
      change: "+5.1% vs last month",
      trend: "up",
      color: "green",
      icon: "📄",
    },
    {
      title: "Total Visits (QR)",
      value: "48,320",
      change: "+12.4% vs last month",
      trend: "up",
      color: "green",
      icon: "🔳",
    },
    {
      title: "Rewards Redeemed",
      value: "6,710",
      change: "-2.3% vs last month",
      trend: "down",
      color: "red",
      icon: "🎁",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Dashboard Content */}
      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "5px" }}>Dashboard</h2>
        <p style={{ marginBottom: "20px", color: "#555" }}>
          Welcome back! Here's what's happening today.
        </p>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {stats.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                {item.icon}
              </div>
              <h4 style={{ marginBottom: "10px", color: "#333" }}>
                {item.title}
              </h4>
              <h2 style={{ marginBottom: "10px", color: "#0E2A47" }}>
                {item.value}
              </h2>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: item.color,
                  fontWeight: "bold",
                }}
              >
                {item.trend === "up" ? (
                  <span style={{ marginRight: "5px" }}>↑</span>
                ) : (
                  <span style={{ marginRight: "5px" }}>↓</span>
                )}
                {item.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatCard
