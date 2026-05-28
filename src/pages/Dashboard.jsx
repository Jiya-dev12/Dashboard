import React from "react";
import {
  FaUser,
  FaBuilding,
  FaQrcode,
  FaGift,
  FaBell,
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaBars,
} from "react-icons/fa";
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
import { BarChart, Bar } from "recharts";

const lineData = [
  { month: "Jan", visits: 4000, rewards: 2400 },
  { month: "Feb", visits: 4200, rewards: 2500 },
  { month: "Mar", visits: 4600, rewards: 2600 },
  { month: "Apr", visits: 4800, rewards: 2700 },
  { month: "May", visits: 5000, rewards: 2800 },
];

const pieData = [
  { name: "Redeemed", value: 38 },
  { name: "Pending", value: 45 },
  { name: "Expired", value: 17 },
];

const COLORS = ["#1E3A5F", "#FF9800", "#9E9E9E"];

const Dashboard = ({ collapsed, setCollapsed }) => {
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
      <div style={{ padding: "20px" }}>
        {/* ✅ padding kam kar diya */}
        <h1
          style={{ marginBottom: "8px", color: "#0E2A47", fontWeight: "bold" }}
        >
          Dashboard
        </h1>
        <p style={{ color: "#555", marginBottom: "10px" }}>
          {/* ✅ marginBottom add kiya */}
          Welcome back! <b>Here’s what’s happening today.</b>
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px", // ✅ gap kam kar diya (20px → 12px)
          padding: "10px", // ✅ padding kam kar diya (20px → 10px)
          marginTop: "-10px", // ✅ thoda upar kheench liya
        }}
      >
        {/* Total Customers */}

        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px 20px", // same padding
            borderRadius: "14px", // same rounded corners
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // same shadow
            position: "relative",
            minHeight: "160px", // same height
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FaUser
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#1E3A5F",
              fontSize: "26px", // same icon size
            }}
          />

          <h5
            style={{
              marginBottom: "10px",
              color: "#717070",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Total Customers
          </h5>
          <p
            style={{
              fontSize: "28px",
              color: "#0E2A47",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            12,480
          </p>
          <p style={{ color: "green", fontWeight: "bold", fontSize: "14px" }}>
            ↑ +8.2% vs last month
          </p>
        </div>

        {/* Active Businesses */}

        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px 20px", // same padding
            borderRadius: "14px", // same rounded corners
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // same shadow
            position: "relative",
            minHeight: "160px", // same height
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FaBuilding
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#1E3A5F",
              fontSize: "26px", // same icon size
            }}
          />
          <h5
            style={{
              marginBottom: "10px",
              color: "#717070",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Active Businesses
          </h5>
          <p
            style={{
              fontSize: "28px",
              color: "#0E2A47",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            184
          </p>
          <p style={{ color: "green", fontWeight: "bold", fontSize: "14px" }}>
            ↑ +5.1% vs last month
          </p>
        </div>

        {/* Total Visits */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px 20px", // same padding
            borderRadius: "14px", // same rounded corners
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // same shadow
            position: "relative",
            minHeight: "160px", // same height
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FaQrcode
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#1E3A5F",
              fontSize: "26px", // same icon size
            }}
          />

          <h5
            style={{
              marginBottom: "10px",
              color: "#717070",
              fontWeight: "bold",
            }}
          >
            Total Visits (QR)
          </h5>
          <p
            style={{
              fontSize: "28px",
              color: "#0E2A47",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            48,320
          </p>
          <p style={{ color: "green", fontWeight: "bold", fontSize: "14px" }}>
            ↑ +12.4% vs last month
          </p>
        </div>

        {/* Rewards Redeemed */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "25px 20px", // same padding
            borderRadius: "14px", // same rounded corners
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // same shadow
            position: "relative",
            minHeight: "160px", // same height
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FaGift
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              color: "#1E3A5F",
              fontSize: "26px", // same icon size
            }}
          />

          <h5
            style={{
              marginBottom: "10px",
              color: "#717070",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Rewards Redeemed
          </h5>
          <p
            style={{
              fontSize: "28px",
              color: "#0E2A47",
              fontWeight: "bold",
              marginBottom: "8px",
            }}
          >
            6,710
          </p>
          <p style={{ color: "red", fontWeight: "bold", fontSize: "14px" }}>
            ↓ -2.3% vs last month
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div
        style={{ display: "flex", gap: "40px", padding: "10px 10px 30px 10px" }}
      >
        {/* Line Chart */}
        <div
          style={{
            flex: 2,
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            minHeight: 350,
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              color: "#0E2A47",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Visits & Rewards Trends
          </h3>
          <p style={{ color: "#717070", marginBottom: "20px" }}>
            Monthly overview for 2024
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#1E3A5F"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="rewards"
                stroke="#1FA2C9"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            minHeight: 350,
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              color: "#0E2A47",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Reward Status
          </h3>
          <p style={{ color: "#717070", marginBottom: "20px" }}>
            Distribution of all rewards
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
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

      {/* Extra Section Below Charts */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          padding: "10px 10px 30px 10px",
        }}
      >
        {/* Top Businesses by Visits */}
        <div
          style={{
            flex: 2,
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            height: 400, // fixed height for graph box
          }}
        >
          <h3
            style={{
              marginBottom: "10px",
              color: "#0E2A47",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Top Businesses by Visits
          </h3>
          <p style={{ color: "#555", marginBottom: "20px" }}>This month</p>

          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              layout="vertical"
              data={[
                { name: "Coffee Palace", visits: 842 },
                { name: "Fresh Eats", visits: 720 },
                { name: "Gym Hub", visits: 615 },
                { name: "Bella Salon", visits: 530 },
                { name: "Tea House", visits: 180 },
                { name: "Burger World", visits: 130 },
              ]}
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="visits" fill="#1E3A5F" barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            padding: "20px 30px",
            height: 400, // fixed height for activity box
            overflowY: "auto", // scroll if content exceeds height
          }}
        >
          <h2
            style={{
              marginBottom: "10px",
              color: "#0E2A47",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Recent Activity
          </h2>
          <p style={{ color: "#555", marginBottom: "20px" }}>
            Live system events
          </p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {/* Sarah M. */}
            <li
              style={{
                backgroundColor: "#fff",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#4CAF50", // green circle
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                S
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                  Sarah M. — Redeemed 10% discount
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#777",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px", // ✅ thodi si extra space icons aur text ke darmiyan
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaMapMarkerAlt style={{ color: "#1E3A5F" }} /> Coffee
                    Palace
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaClock style={{ color: "#1E3A5F" }} /> 2 min ago
                  </span>
                </p>
              </div>
            </li>
            {/* John D. */}
            <li
              style={{
                backgroundColor: "#fff",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#2196F3", // blue circle
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                J
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                  John D. — Completed 5 visits
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#777",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px", // ✅ thodi si extra space icons aur text ke darmiyan
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaMapMarkerAlt style={{ color: "#1E3A5F" }} /> Fresh Eats
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaClock style={{ color: "#1E3A5F" }} /> 15 min ago
                  </span>
                </p>
              </div>
            </li>

            {/* Aisha K. */}
            <li
              style={{
                backgroundColor: "#fff",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#FF9800", // orange circle
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                A
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                  Aisha K. — New registration
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#777" }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaClock style={{ color: "#1E3A5F" }} /> 32 min ago
                  </span>
                </p>
              </div>
            </li>

            {/* Priya S. */}
            <li
              style={{
                backgroundColor: "#fff",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#E91E63", // pink circle
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                P
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                  Priya S. — Redeemed free coffee
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#777",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px", // ✅ thodi si extra space icons aur text ke darmiyan
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaMapMarkerAlt style={{ color: "#1E3A5F" }} /> Coffee
                    Palace
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaClock style={{ color: "#1E3A5F" }} /> 1 hr ago
                  </span>
                </p>
              </div>
            </li>

            {/* Raza H. */}
            <li
              style={{
                backgroundColor: "#fff",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#3F51B5", // indigo circle
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                R
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                  Raza H. — Claimed loyalty reward
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#777",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px", // ✅ thodi si extra space icons aur text ke darmiyan
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaMapMarkerAlt style={{ color: "#1E3A5F" }} /> Glow Spa
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaClock style={{ color: "#1E3A5F" }} /> 2 hrs ago
                  </span>
                </p>
              </div>
            </li>

            {/* Lara S. */}
            <li
              style={{
                backgroundColor: "#fff",
                padding: "12px 15px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#009688", // teal circle
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                L
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
                  Lara S. — Purchased premium membership
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: "#777",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px", // ✅ thodi si extra space icons aur text ke darmiyan
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaMapMarkerAlt style={{ color: "#1E3A5F" }} /> Tech Fix Pro
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <FaClock style={{ color: "#1E3A5F" }} /> 3 hrs ago
                  </span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
