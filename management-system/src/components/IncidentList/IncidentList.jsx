import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IncidentList.css"; // Import your CSS file for styling

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Get current logged-in user's email from localStorage
        const currentUserEmail = localStorage.getItem("currentUserEmail");

        if (!currentUserEmail) {
            navigate("/"); // Redirect to login if no user is logged in
            return;
        }

        // Get incidents stored under the current user's email
        const allIncidents = JSON.parse(localStorage.getItem("incidents")) || {};

        // Fetch the incidents for the logged-in user
        const userIncidents = allIncidents[currentUserEmail] || [];
        setIncidents(userIncidents);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("currentUserEmail"); // Remove logged-in user's email from localStorage
        navigate("/"); // Redirect to home or login
    };

    const filteredIncidents = incidents.filter(incident =>
        incident.incidentID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="incident-list-container">
            <div className="header">
                <h2>Incident List</h2>
            </div>
            <button onClick={handleLogout} className="logout-btn" style={{ marginBottom: "20px" }}>
                Logout
            </button>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Incident ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
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
                            console.log("incident", incident);
                            return (
                                <tr key={incident.incidentID}>
                                    <td>{incident.incidentID}</td>
                                    <td>{incident.incidentDetails}</td>
                                    <td>{incident.priority}</td>
                                    <td>{incident.status}</td>
                                    <td>{incident.reporterName}</td>
                                </tr>
                            );
                        })
                    ) : (
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
