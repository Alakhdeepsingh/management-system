import React, { useEffect, useState } from "react";
import "./IncidentList.css"; // Import your CSS file for styling

const IncidentList = () => {
    const [incidents, setIncidents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Fetch incidents from localStorage
        const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
        setIncidents(storedIncidents);
    }, []);

    // Filter incidents based on search query (search by Incident ID)
    const filteredIncidents = incidents.filter(incident =>
        incident.incidentID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="incident-list-container">
            <h2>Incident List</h2>

            {/* Search Input */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Incident ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Incident Table */}
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
