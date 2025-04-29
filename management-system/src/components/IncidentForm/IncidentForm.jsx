import React, { useState, useEffect } from 'react';
import './IncidentForm.css';
import { useNavigate } from 'react-router-dom';

const IncidentForm = () => {
    const [incidentType, setIncidentType] = useState('Enterprise');
    const [incidentDetails, setIncidentDetails] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [status, setStatus] = useState('Open');
    const [reporterName, setReporterName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const currentUserEmail = localStorage.getItem("currentUserEmail");

        if (!currentUserEmail) {
            alert("User not logged in.");
            navigate("/");
            return;
        }

        const currentUser = users.find(user => user.email === currentUserEmail);

        if (currentUser) {
            setReporterName(currentUser.firstName);
        } else {
            alert("User not found.");
            navigate("/");
        }
    }, [navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!incidentDetails || !priority || !status || !reporterName) {
            alert("Please fill out all required fields.");
            return;
        }

        const incidentID = `RMG${Math.floor(Math.random() * 100000)}${new Date().getFullYear()}`;
        const newIncident = {
            incidentID,
            incidentDetails,
            priority,
            status,
            reporterName,
            incidentType,
            createdAt: new Date().toISOString(),
        };

        const currentUserEmail = localStorage.getItem("currentUserEmail");
        const allUserIncidents = JSON.parse(localStorage.getItem("userIncidents")) || {};

        if (!allUserIncidents[currentUserEmail]) {
            allUserIncidents[currentUserEmail] = [];
        }

        allUserIncidents[currentUserEmail].push(newIncident);

        localStorage.setItem("userIncidents", JSON.stringify(allUserIncidents));

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
                    <label>Reporter Name:</label>
                    <input
                        type="text"
                        value={reporterName}
                        readOnly
                        disabled
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
