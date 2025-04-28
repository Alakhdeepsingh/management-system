import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
// import IncidentForm from "../../pages/IncidentForm/IncidentForm";

const Dashboard = () => {
    const navigate = useNavigate();

    // Get the user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        navigate("/login");
        return null;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <button onClick={() => navigate("/incidentform")}>Create Incident</button>
            </div>
            <div style={{ display: "flex", gap: "30px", justifyContent: "center", alignItems: "center" }}>
                <div style={{ background: "aliceblue", borderRadius: "18px", padding: "5px", maxWidth: "300px", width: "100%" }}>
                    <h2>Welcome, {user.firstName}</h2>
                    <p>Email: {user.email}</p>
                </div>
            </div>

            <Link to="/">Go to Login</Link>
        </div>

    );
};

export default Dashboard;
