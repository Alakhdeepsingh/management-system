import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IncidentList.css"; // Import custom CSS styles

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]); // Holds the list of incidents for the logged-in user
    const [searchQuery, setSearchQuery] = useState(""); // Stores search input text
    const navigate = useNavigate(); // React Router hook for navigation

    useEffect(() => {
        // Retrieve the current user's email from localStorage
        const currentUserEmail = localStorage.getItem("currentUserEmail");


        // If no user is logged in, redirect to the login/home page
        if (!currentUserEmail) {
            navigate("/");
            return;
        }

        // Get all incidents from localStorage, or use empty object if null
        const allIncidents = JSON.parse(localStorage.getItem("userIncidents")) || {};


        // Extract only incidents belonging to the currently logged-in user
        const userIncidents = allIncidents[currentUserEmail] || [];

        // Update state with user's incidents
        setIncidents(userIncidents);
    }, [navigate]);

    // Handle logout functionality
    const handleLogout = () => {
        localStorage.removeItem("currentUserEmail"); // Clear session
        navigate("/"); // Redirect to login/home
    };

    // Filter incidents based on the incident ID search query (case-insensitive)
    const filteredIncidents = incidents.filter((incident) =>
        incident.incidentID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (id) => {
        navigate(`/edit-incident/${id}`);
    };


    return (
        <div className="incident-list-container">
            {/* Header */}
            <div className="header">
                <h2>Incident List</h2>
            </div>

            {/* Logout button */}
            <button
                onClick={handleLogout}
                className="logout-btn"
                style={{ marginBottom: "20px" }}
            >
                Logout
            </button>

            {/* Search input field */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Incident ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Incident list table */}
            <table className="incident-table">
                <thead>
                    <tr>
                        <th>Incident ID</th>
                        <th>Details</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Reporter</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredIncidents.length > 0 ? (
                        filteredIncidents.map((incident) => {
                            return (
                                <tr key={incident.incidentID}>
                                    <td>{incident.incidentID}</td>
                                    <td>{incident.incidentDetails}</td>
                                    <td>{incident.priority}</td>
                                    <td>{incident.status}</td>
                                    <td>{incident.reporterName}</td>
                                    <td>
                                        <button onClick={() => handleEdit(incident.incidentID)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        // Fallback row when no incidents match the filter
                        <tr>
                            <td colSpan="5">No incidents found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default IncidentList;
