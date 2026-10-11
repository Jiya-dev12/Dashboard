import React, { useEffect, useState } from "react";
import {
  FaCamera,
  FaBell,
  FaSearch,
  FaBars,
  FaUser,
  FaShieldAlt,
  FaUserTie,
  FaUserCog,
  FaLock,
  FaTrash,
  FaPlus,
  FaEnvelope,
  FaKey,
  FaUserPlus,
} from "react-icons/fa";
import { supabase } from "../supabase";

const Settings = ({ collapsed, setCollapsed }) => {
  const [showModal, setShowModal] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadAdminProfile = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (!mounted) return;

      if (error || !data.user) {
        console.error("Logged-in admin error:", error);
        setLoading(false);
        return;
      }

      const user = data.user;

      setFullName(
        user.user_metadata?.full_name || user.user_metadata?.name || "",
      );

      setEmail(user.email || "");
      setOriginalEmail(user.email || "");
      setLoading(false);
    };

    loadAdminProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSaveChanges = async () => {
    if (!fullName.trim() || !email.trim()) {
      alert("Please enter your name and email.");
      return;
    }

    setSaving(true);

    try {
      const updates = {
        data: {
          full_name: fullName.trim(),
        },
      };

      if (email.trim().toLowerCase() !== originalEmail.toLowerCase()) {
        updates.email = email.trim();
      }

      const { data, error } = await supabase.auth.updateUser(updates);

      if (error) throw error;

      const updatedUser = data.user;

      setFullName(updatedUser.user_metadata?.full_name || fullName.trim());

      setEmail(updatedUser.email || email.trim());
      setOriginalEmail(updatedUser.email || email.trim());

      alert(
        email.trim().toLowerCase() !== originalEmail.toLowerCase()
          ? "Profile updated. Check your email if confirmation is required."
          : "Profile updated successfully!",
      );
    } catch (error) {
      console.error("Profile update error:", error);
      alert(error.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadAdminProfile = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Admin fetch error:", error.message);
        return;
      }

      const user = data.user;

      if (user) {
        setFullName(
          user.user_metadata?.display_name ||
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.user_metadata?.displayName ||
            "",
        );

        setEmail(user.email || "");
      }
    };

    loadAdminProfile();
  }, []);

  const handleResetPassword = async () => {
    if (!email) {
      alert("Admin email not found.");
      return;
    }

    const confirmed = window.confirm(`Send a password reset link to ${email}?`);

    if (!confirmed) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Password reset link has been sent to " + email);
  };

  const handleDeleteAdmin = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Unable to identify the logged-in admin.");
      return;
    }

    const confirmed = window.confirm(
      `Permanently delete ${user.email}'s account? This action cannot be undone.`,
    );

    if (!confirmed) return;

    const { error } = await supabase.functions.invoke("delete-own-admin", {
      body: { userId: user.id },
    });

    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }

    await supabase.auth.signOut();

    alert("Account deleted successfully.");

    window.location.href = "/login";
  };

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
          Profile Settings
        </h1>
        <p style={{ color: "#717070", fontSize: "17px" }}>
          Manage your Profile and Admin accounts.
        </p>
      </div>

      {/* 🔹 General Profile Settings */}
      <div
        style={{
          maxWidth: "1250px",
          marginTop: "-20px", // ✅ thora upar
          marginBottom: "40px", // ✅ neeche space
          marginLeft: "30px", // ✅ push to right
          marginRight: "0", // ✅ stick to right side
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
            color: "#0E2A47",
            display: "flex",
            alignItems: "center",
            gap: "10px", // ✅ spacing between icon and text
            fontWeight: "bold",
            fontSize: "22px",
          }}
        >
          <FaUser style={{ color: "#1E3A5F", fontSize: "24px" }} />
          General Profile Settings
        </h2>

        {/* 🔹 Top Row: Icon + Fields */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "30px" }}>
          {/* Circle Icon */}
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#e0e0e0",
              color: "#777",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "36px", // bigger text
              fontWeight: "bold",
              position: "relative",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {loading ? "..." : fullName.trim().charAt(0).toUpperCase() || "A"}
            {/* Camera Icon Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "#1E3A5F", // dark circle background
                borderRadius: "50%", // ✅ perfectly round
                padding: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaCamera style={{ color: "#fff", fontSize: "16px" }} />{" "}
              {/* white camera icon */}
            </div>
          </div>

          {/* Full Name (Left) + Email (Right) */}

          {/* Full Name + Email */}
          <div style={{ display: "flex", gap: "20px", flex: 1 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: "bold", color: "#333" }}>
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                disabled={loading || saving}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px",
                  marginTop: "6px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "15px",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ fontWeight: "bold", color: "#333" }}>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading || saving}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px",
                  marginTop: "6px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "15px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* admin section */}
      <div
        style={{
          maxWidth: "1250px",
          marginTop: "-20px", // ✅ thora upar
          marginBottom: "40px", // ✅ neeche space
          marginLeft: "30px", // ✅ push to right
          marginRight: "0", // ✅ stick to right side
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header with Icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "#0E2A47",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px", // ✅ spacing between icon and text
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            <FaShieldAlt style={{ color: "#1E3A5F", fontSize: "24px" }} />
            Admin Management
          </h2>

          <button
            onClick={() => setShowModal(true)}
            style={{
              background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaPlus /> Add Admin
          </button>
        </div>
        {/* Modal */}
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
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "30px",
                borderRadius: "12px",
                width: "400px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#0E2A47",
                  fontSize: "22px",
                  fontWeight: "bold",
                }}
              >
                <FaUserPlus style={{ color: "#1E3A5F", fontSize: "24px" }} />
                Create New Admin
              </h3>
              {/* Full Name */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                  }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="jane@smartvisit.com"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Role */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                  }}
                >
                  Role
                </label>
                <input
                  type="role"
                  placeholder="Admin"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "6px",
                    fontWeight: "bold",
                  }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                }}
              >
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    backgroundColor: "#f1f3f4",
                    color: "#0E2A47",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Create Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin List */}
        <div>
          {(email
            ? [
                {
                  name: fullName || "Admin",
                  role: "Admin",
                  email: email,
                },
              ]
            : []
          ).map((admin, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                gap: "20px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)", // ✅ neat card shadow
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Round Avatar */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#1E3A5F",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {admin.name.charAt(0)} {/* First letter e.g. S */}
              </div>

              {/* Info Section */}
              <div style={{ flex: 1 }}>
                {/* Name + Role Badge */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <b style={{ color: "#0E2A47", fontSize: "16px" }}>
                    {admin.name}
                  </b>
                  <span
                    style={{
                      backgroundColor: "#f1f3f4",
                      color: "#0E2A47",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {admin.role}
                  </span>
                </div>

                {/* Email with Icon */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                >
                  <FaEnvelope style={{ color: "#1E3A5F", fontSize: "14px" }} />
                  <span style={{ fontSize: "13px", color: "#555" }}>
                    {admin.email}
                  </span>
                </div>
              </div>

              {/* Right side: Actions */}
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={handleResetPassword}
                  style={{
                    backgroundColor: "#fff",
                    color: "#1E3A5F",
                    padding: "12px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: "bold",
                  }}
                >
                  <FaKey /> Reset Password
                </button>

                <button
                  onClick={handleDeleteAdmin}
                  style={{
                    border: "1px solid #ddd",
                    backgroundColor: "#fff",
                    borderRadius: "6px",
                    padding: "12px",
                    cursor: "pointer",
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div
        style={{
          maxWidth: "1250px",
          marginTop: "-20px", // ✅ thora upar
          marginBottom: "5px", // ✅ neeche space
          marginLeft: "30px", // ✅ push to right
          marginRight: "0", // ✅ stick to right side
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Buttons Row */}
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          <button
            style={{
              backgroundColor: "#f1f3f4",
              color: "#0E2A47",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSaveChanges}
            disabled={loading || saving}
            style={{
              backgroundColor: "#1E3A5F",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: loading || saving ? "not-allowed" : "pointer",
              fontWeight: "bold",
              opacity: loading || saving ? 0.7 : 1,
            }}
          >
            {loading ? "Loading..." : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
