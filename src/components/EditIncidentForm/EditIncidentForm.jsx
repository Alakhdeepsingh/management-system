import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditIncidentForm.css';

const EditIncidentForm = () => {
    const { id } = useParams();
    const [incidentData, setIncidentData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUserEmail = localStorage.getItem("currentUserEmail");
        const allUserIncidents = JSON.parse(localStorage.getItem("userIncidents")) || {};
        const userIncidents = allUserIncidents[currentUserEmail] || [];
        const incident = userIncidents.find(i => i.incidentID === id);

        if (incident) {
            setIncidentData(incident);
        } else {
            alert("Incident not found.");
            navigate("/incidentlist");
        }
    }, [id, navigate]);

    const handleUpdate = (e) => {
        e.preventDefault();

        const currentUserEmail = localStorage.getItem("currentUserEmail");
        const allUserIncidents = JSON.parse(localStorage.getItem("userIncidents")) || {};
        const userIncidents = allUserIncidents[currentUserEmail] || [];

        const updatedIncidents = userIncidents.map(i =>
            i.incidentID === id ? { ...incidentData } : i
        );

        allUserIncidents[currentUserEmail] = updatedIncidents;
        localStorage.setItem("userIncidents", JSON.stringify(allUserIncidents));

        navigate("/incidentlist");
    };

    if (!incidentData) return <div>Loading...</div>;

    return (
        <div className="incident-form-container">
            <h2>Edit Incident</h2>
            <form onSubmit={handleUpdate} className="incident-form">
                <div className="form-group">
                    <label>Incident Type:</label>
                    <select
                        value={incidentData.incidentType}
                        onChange={(e) => setIncidentData({ ...incidentData, incidentType: e.target.value })}
                    >
                        <option value="Enterprise">Enterprise</option>
                        <option value="Government">Government</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Reporter Name:</label>
                    <input type="text" value={incidentData.reporterName} readOnly disabled />
                </div>

                <div className="form-group">
                    <label>Incident Details:</label>
                    <textarea
                        value={incidentData.incidentDetails}
                        onChange={(e) => setIncidentData({ ...incidentData, incidentDetails: e.target.value })}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Priority:</label>
                    <select
                        value={incidentData.priority}
                        onChange={(e) => setIncidentData({ ...incidentData, priority: e.target.value })}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select
                        value={incidentData.status}
                        onChange={(e) => setIncidentData({ ...incidentData, status: e.target.value })}
                    >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>

                <button type="submit">Update Incident</button>
            </form>
        </div>
    );
};

export default EditIncidentForm;
