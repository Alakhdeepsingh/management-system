import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Add this line
import "./IncidentList.css"; // Import your CSS file for styling

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // <-- Initialize navigate

    useEffect(() => {
        const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
        setIncidents(storedIncidents);
    }, []);

    const handleLogout = () => {
        // Clear user session or entire localStorage (as per your logic)
        // localStorage.clear(); // Clears everything
        localStorage.removeItem("users"); // Example: Clear only user info
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
                        filteredIncidents.map((incident) => (
                            <tr key={incident.incidentID}>
                                <td>{incident.incidentID}</td>
                                <td>{incident.incidentDetails}</td>
                                <td>{incident.priority}</td>
                                <td>{incident.status}</td>
                                <td>{incident.reporterName}</td>
                            </tr>
                        ))
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
