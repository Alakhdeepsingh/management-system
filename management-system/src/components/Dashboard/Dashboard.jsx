import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    // Get the logged-in user's email
    const loggedInUserEmail = localStorage.getItem("currentUserEmail");

    // Get all users from localStorage
    const allUsers = JSON.parse(localStorage.getItem("users"));
    // Find the logged-in user using the stored email
    const user = allUsers.find((user) => user.email === loggedInUserEmail);

    // If the user is not logged in or not found, redirect to login
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
                    <h2>Welcome, {user.firstName} {user.lastName}</h2>
                    <p>Email: {user.email}</p>
                </div>
            </div>

            <Link to="/">Go to Login</Link>
        </div>
    );
};

export default Dashboard;
