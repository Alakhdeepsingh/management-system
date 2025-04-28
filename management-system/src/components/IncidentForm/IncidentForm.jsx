import React, { useState } from 'react';
import './IncidentForm.css'; // Import your CSS file for styling

const IncidentForm = () => {
    // State to store form data
    const [incidentType, setIncidentType] = useState('Enterprise');
    const [reporterName, setReporterName] = useState('');
    const [incidentDetails, setIncidentDetails] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Open');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!incidentDetails || !priority || !status || !reporterName) {
            alert("Please fill out all required fields.");
            return;
        }

        // Generate a unique Incident ID (can also be handled via backend)
        const incidentID = `RMG${Math.floor(Math.random() * 100000)}${new Date().getFullYear()}`;

        // Store the incident in localStorage (append to an existing array of incidents)
        const newIncident = {
            incidentID,
            incidentDetails,
            priority,
            status,
            reporterName,
            createdAt: new Date().toISOString(),
        };

        const existingIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
        existingIncidents.push(newIncident);
        localStorage.setItem("incidents", JSON.stringify(existingIncidents));

        // Redirect to the Incident List page
        navigate("/incidentlist");
    };


    return (
        <div className="incident-form-container">
            <h2>Create a New Incident</h2>
            <form onSubmit={handleSubmit} className="incident-form">
                <div className="form-group">
                    <label htmlFor="incidentType">Incident Type:</label>
                    <select
                        id="incidentType"
                        value={incidentType}
                        onChange={(e) => setIncidentType(e.target.value)}
                    >
                        <option value="Enterprise">Enterprise</option>
                        <option value="Government">Government</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="reporterName">Reporter Name:</label>
                    <input
                        type="text"
                        id="reporterName"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="incidentDetails">Incident Details:</label>
                    <textarea
                        id="incidentDetails"
                        value={incidentDetails}
                        onChange={(e) => setIncidentDetails(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <button type="submit">Create Incident</button>
            </form>
        </div>
    );
};

export default IncidentForm;
