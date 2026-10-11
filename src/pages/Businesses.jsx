import {
  FaBell,
  FaSearch,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaStar,
  FaBars,
} from "react-icons/fa";

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

const Businesses = ({ collapsed, setCollapsed }) => {
  const [showModal, setShowModal] = useState(false);
  const [businessForm, setBusinessForm] = useState({
    business_name: "",
    owner_name: "",
    phone: "",
    latitude: "",
    longitude: "",
    address: "",
    category: "",
    location: "",
    email: "",
  });

  const [filterStatus, setFilterStatus] = useState("All Status");
  const [menuIndex, setMenuIndex] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBusiness, setEditBusiness] = useState(null);

  const handleEdit = (business) => {
    setOpenMenuId(null);

    setEditBusiness({
      business_id: business.business_id,
      business_name: business.business_name || "",
      owner_name: business.owner_name || "",
      phone: business.phone || "",
      category: business.category || "",
      location: business.location || "",
      latitude: business.latitude ?? "",
      longitude: business.longitude ?? "",
    });

    setShowEditModal(true);
  };

  const handleDelete = async (business) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${business.business_name}"?`,
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const { error } = await supabase
        .from("business")
        .delete()
        .eq("business_id", business.business_id);

      if (error) {
        console.error("DELETE BUSINESS ERROR:", error);
        alert(error.message);
        return;
      }

      // Menu close
      setOpenMenuId(null);

      // Table refresh
      await fetchBusinesses();

      alert("Business deleted successfully.");
    } catch (error) {
      console.error("DELETE ERROR:", error);
      alert("Something went wrong while deleting the business.");
    }
  };

  const fetchBusinesses = async () => {
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("SUPABASE SESSION:", session);

    const { data, error } = await supabase
      .from("business")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("BUSINESS DATA:", data);
    console.log("BUSINESS ERROR:", error);

    if (error) {
      console.error("Error fetching businesses:", error);
      setLoading(false);
      return;
    }

    setBusinesses(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const totalBusinesses = businesses.length;

  const approvedBusinesses = businesses.filter(
    (business) => business.approval_status === "approved",
  ).length;

  const pendingBusinesses = businesses.filter(
    (business) => business.approval_status === "pending",
  ).length;

  const totalVisits = businesses.reduce(
    (total, business) => total + (Number(business.visits) || 0),
    0,
  );

  // ✅ Filter logic
  const filteredData =
    filterStatus === "All Status"
      ? businesses
      : businesses.filter((business) =>
          filterStatus === "Approved"
            ? business.approval_status === "approved"
            : business.approval_status === "pending",
        );

  const handleToggleStatus = async (business) => {
    if (!business?.business_id) {
      console.error("Business ID not found:", business);
      return;
    }

    const newApprovalStatus =
      business.approval_status === "approved" ? "pending" : "approved";

    const { error } = await supabase
      .from("business")
      .update({
        approval_status: newApprovalStatus,
      })
      .eq("business_id", business.business_id);

    if (error) {
      console.error("APPROVAL STATUS ERROR:", error);
      alert(error.message);
      return;
    }

    await fetchBusinesses();
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
  };

  const handleAddBusiness = async () => {
    if (!businessForm.business_name.trim()) {
      alert("Please enter Business Name");
      return;
    }

    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    const newBusiness = {
      business_name: businessForm.business_name.trim(),
      owner_name: businessForm.owner_name.trim(),
      phone: businessForm.phone.trim(),
      latitude: businessForm.latitude ? Number(businessForm.latitude) : null,
      longitude: businessForm.longitude ? Number(businessForm.longitude) : null,
      address: businessForm.address.trim(),
      category: businessForm.category,
      location: businessForm.location.trim(),
      ...(userId ? { user_id: userId } : {}),
    };

    const { data, error } = await supabase
      .from("business")
      .insert([newBusiness])
      .select();

    if (error) {
      console.error("ADD BUSINESS ERROR:", error);
      alert("Business save nahi hua: " + error.message);
      return;
    }

    // Refresh business list
    const { data: refreshedBusinesses, error: fetchError } = await supabase
      .from("business")
      .select("*")
      .order("business_name");

    if (fetchError) {
      console.error("REFRESH BUSINESS ERROR:", fetchError);
    } else {
      setBusinesses(refreshedBusinesses || []);
    }

    setBusinessForm({
      business_name: "",
      owner_name: "",
      phone: "",
      latitude: "",
      longitude: "",
      address: "",
      category: "",
      location: "",
      email: "",
    });

    setShowModal(false);
    alert("Business added successfully!");
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
            <option>Approved</option>
            <option>Pending</option>
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

      {/* Add New Business Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "15px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "600px",
              maxWidth: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            {/* Close Button */}
            <span
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                fontSize: "26px",
                color: "#777",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              ×
            </span>

            <h2 style={{ color: "#0E2A47", marginBottom: "25px" }}>
              Add New Business
            </h2>

            {/* Business Name */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Business Name
            </label>
            <input
              type="text"
              placeholder="Business Name"
              value={businessForm.business_name}
              onChange={(e) =>
                setBusinessForm({
                  ...businessForm,
                  business_name: e.target.value,
                })
              }
              style={inputStyle}
            />

            {/* Owner Name */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Owner Name
            </label>
            <input
              type="text"
              placeholder="Owner Name"
              value={businessForm.owner_name}
              onChange={(e) =>
                setBusinessForm({ ...businessForm, owner_name: e.target.value })
              }
              style={inputStyle}
            />

            {/* Phone */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Phone
            </label>
            <input
              type="text"
              placeholder="Phone Number"
              value={businessForm.phone}
              onChange={(e) =>
                setBusinessForm({ ...businessForm, phone: e.target.value })
              }
              style={inputStyle}
            />

            {/* Latitude and Longitude */}
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="Latitude"
                  value={businessForm.latitude}
                  onChange={(e) =>
                    setBusinessForm({
                      ...businessForm,
                      latitude: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="Longitude"
                  value={businessForm.longitude}
                  onChange={(e) =>
                    setBusinessForm({
                      ...businessForm,
                      longitude: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </div>
            </div>

            {/* Address */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Business Address"
              value={businessForm.address}
              onChange={(e) =>
                setBusinessForm({ ...businessForm, address: e.target.value })
              }
              style={inputStyle}
            />

            {/* Category */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Category
            </label>
            <select
              value={businessForm.category}
              onChange={(e) =>
                setBusinessForm({ ...businessForm, category: e.target.value })
              }
              style={inputStyle}
            >
              <option value="">Select Category</option>
              <option value="Café">Café</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Retail">Retail</option>
              <option value="Services">Services</option>
            </select>

            {/* Location */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Location
            </label>
            <input
              type="text"
              placeholder="e.g. Sargodha"
              value={businessForm.location}
              onChange={(e) =>
                setBusinessForm({ ...businessForm, location: e.target.value })
              }
              style={inputStyle}
            />

            {/* Contact Email */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Contact Email
            </label>
            <input
              type="email"
              placeholder="owner@business.com"
              value={businessForm.email}
              onChange={(e) =>
                setBusinessForm({ ...businessForm, email: e.target.value })
              }
              style={inputStyle}
            />

            {/* Save Button */}
            <button
              onClick={handleAddBusiness}
              style={{
                width: "100%",
                padding: "13px",
                marginTop: "12px",
                background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
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
            {totalBusinesses}
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
          <h3 style={{ margin: 0, color: "green", fontWeight: "bold" }}>
            {approvedBusinesses}
          </h3>
          <p style={{ margin: 0, color: "#717070" }}>Approved</p>
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
          <h3 style={{ margin: 0, color: "red", fontWeight: "bold" }}>
            {pendingBusinesses}
          </h3>
          <p style={{ margin: 0, color: "#717070" }}>Pending</p>
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
            {totalVisits.toLocaleString()}
          </h3>
          <p style={{ margin: 0, color: "#717070" }}>Total Visits</p>
        </div>
      </div>

      {/* Business Table */}
      <div
        style={{
          padding: "0 30px 30px 30px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: "100%",
            overflowX: "auto",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#f1f3f4",
                  textAlign: "left",
                }}
              >
                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Business Name
                </th>

                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Owner Name
                </th>

                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Category
                </th>

                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Location
                </th>

                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Latitude
                </th>

                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Longitude
                </th>

                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Phone
                </th>

                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Approval Status
                </th>

                <th
                  style={{
                    padding: "14px 15px",
                    fontSize: "15px",
                    color: "#0E2A47",
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    whiteSpace: "nowrap",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                      fontSize: "15px",
                      color: "#333",
                    }}
                  >
                    Loading businesses...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                      fontSize: "15px",
                      color: "#333",
                    }}
                  >
                    No businesses found.
                  </td>
                </tr>
              ) : (
                filteredData.map((business) => (
                  <tr
                    key={business.business_id}
                    style={{
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    {/* Business Name */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <strong>{business.business_name || "—"}</strong>
                    </td>

                    {/* Owner Name */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {business.owner_name || "—"}
                    </td>

                    {/* Category */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "20px",
                          padding: "4px 10px",
                          backgroundColor: "#f9f9f9",
                          fontSize: "14px",
                        }}
                      >
                        {business.category || "—"}
                      </span>
                    </td>

                    {/* Location */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <FaMapMarkerAlt
                          style={{
                            color: "#1E3A5F",
                          }}
                        />

                        {business.location || "—"}
                      </span>
                    </td>

                    {/* Latitude */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {business.latitude ?? "—"}
                    </td>

                    {/* Longitude */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {business.longitude ?? "—"}
                    </td>

                    {/* Phone */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {business.phone || "—"}
                    </td>

                    {/* Approval Status + Toggle */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
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
                          onClick={() => handleToggleStatus(business)}
                          style={{
                            width: "50px",
                            height: "26px",
                            borderRadius: "20px",
                            backgroundColor:
                              business.approval_status === "approved"
                                ? "#4CAF50"
                                : "#aaa",
                            position: "relative",
                            cursor: "pointer",
                            transition: "0.2s",
                          }}
                        >
                          <div
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "50%",
                              backgroundColor: "#fff",
                              position: "absolute",
                              top: "2px",
                              left:
                                business.approval_status === "approved"
                                  ? "26px"
                                  : "2px",
                              transition: "0.2s",
                            }}
                          />
                        </div>

                        <span
                          style={{
                            padding: "5px 10px",
                            borderRadius: "15px",
                            fontSize: "13px",
                            fontWeight: "bold",
                            backgroundColor:
                              business.approval_status === "approved"
                                ? "#e8f7e8"
                                : "#fff3cd",
                            color:
                              business.approval_status === "approved"
                                ? "green"
                                : "#d97706",
                          }}
                        >
                          {business.approval_status === "approved"
                            ? "Approved"
                            : "Pending"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td
                      style={{
                        padding: "14px 15px",
                        fontSize: "15px",
                        color: "#333",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === business.business_id
                                ? null
                                : business.business_id,
                            )
                          }
                          style={{
                            background: "transparent",
                            border: "none",
                            fontSize: "24px",
                            cursor: "pointer",
                          }}
                        >
                          ⋮
                        </button>

                        {openMenuId === business.business_id && (
                          <div
                            style={{
                              position: "absolute",
                              right: "40px",
                              top: "100%",
                              width: "150px",
                              backgroundColor: "#fff",
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                              boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                              zIndex: 9999,
                            }}
                          >
                            {/* Edit */}
                            <button
                              onClick={() => handleEdit(business)}
                              style={{
                                width: "100%",
                                padding: "12px 14px",
                                border: "none",
                                background: "#fff",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <FaEdit />
                              Edit
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(business)}
                              style={{
                                width: "100%",
                                padding: "12px 14px",
                                border: "none",
                                background: "#fff",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                color: "#dc2626",
                              }}
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showEditModal && editBusiness && (
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
            zIndex: 2000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "500px",
              maxWidth: "90%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#0E2A47",
                  fontSize: "24px",
                }}
              >
                Edit Business
              </h2>

              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "25px",
                  cursor: "pointer",
                  color: "#777",
                }}
              >
                ×
              </button>
            </div>

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "6px",
              }}
            >
              Business Name
            </label>

            <input
              type="text"
              value={editBusiness.business_name || ""}
              onChange={(e) =>
                setEditBusiness({
                  ...editBusiness,
                  business_name: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "11px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxSizing: "border-box",
                fontSize: "16px",
              }}
            />

            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "6px",
              }}
            >
              Owner Name
            </label>

            <input
              type="text"
              value={editBusiness.owner_name}
              onChange={(e) =>
                setEditBusiness({
                  ...editBusiness,
                  owner_name: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "11px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "6px",
              }}
            >
              Phone
            </label>

            <input
              type="text"
              value={editBusiness.phone}
              onChange={(e) =>
                setEditBusiness({
                  ...editBusiness,
                  phone: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "11px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "6px",
                  }}
                >
                  Latitude
                </label>

                <input
                  type="number"
                  step="any"
                  value={editBusiness.latitude}
                  onChange={(e) =>
                    setEditBusiness({
                      ...editBusiness,
                      latitude: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "11px",
                    marginBottom: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "6px",
                  }}
                >
                  Longitude
                </label>

                <input
                  type="number"
                  step="any"
                  value={editBusiness.longitude}
                  onChange={(e) =>
                    setEditBusiness({
                      ...editBusiness,
                      longitude: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "11px",
                    marginBottom: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
            <input
              type="text"
              value={editBusiness.business_name}
              onChange={(e) =>
                setEditBusiness({
                  ...editBusiness,
                  business_name: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "11px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />

            {/* Category */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "6px",
              }}
            >
              Category
            </label>

            <select
              value={editBusiness.category}
              onChange={(e) =>
                setEditBusiness({
                  ...editBusiness,
                  category: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "11px",
                marginBottom: "15px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            >
              <option value="">Select Category</option>
              <option value="Cafe">Cafe</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Retail">Retail</option>
              <option value="Services">Services</option>
              <option value="Salon">Salon</option>
            </select>

            {/* Location */}
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "6px",
              }}
            >
              Location
            </label>

            <input
              type="text"
              value={editBusiness.location}
              onChange={(e) =>
                setEditBusiness({
                  ...editBusiness,
                  location: e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "11px",
                marginBottom: "20px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxSizing: "border-box",
              }}
            />

            {/* Save Button */}
            <button
              onClick={async () => {
                if (!editBusiness.business_id) {
                  alert("Business ID not found.");
                  return;
                }

                const { error } = await supabase
                  .from("business")
                  .update({
                    business_name: editBusiness.business_name,
                    owner_name: editBusiness.owner_name,
                    category: editBusiness.category,
                    location: editBusiness.location,
                    latitude: editBusiness.latitude
                      ? Number(editBusiness.latitude)
                      : null,
                    longitude: editBusiness.longitude
                      ? Number(editBusiness.longitude)
                      : null,
                    phone: editBusiness.phone,
                  })
                  .eq("business_id", editBusiness.business_id);

                if (error) {
                  console.error("EDIT BUSINESS ERROR:", error);
                  alert(error.message);
                  return;
                }

                alert("Business updated successfully.");

                setShowEditModal(false);
                setEditBusiness(null);

                await fetchBusinesses();
              }}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(90deg, #1E3A5F, #1FA2C9)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Businesses;
