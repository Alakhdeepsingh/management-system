import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);  // Track loading state
    const [message, setMessage] = useState("");  // Success or error message
    const [error, setError] = useState("");  // Error message

    const handleForgotPassword = (e) => {
        e.preventDefault();

        setLoading(true);  // Start loading
        setError("");  // Clear previous error message
        setMessage(""); // Clear previous success message

        // Simulate API request (replace this with your real API logic later)
        setTimeout(() => {
            // Retrieve the email from localStorage
            const storedEmail = localStorage.getItem('userEmail');

            // Simulating a valid email check
            if (email === storedEmail) {
                setLoading(false);
                setMessage("A password reset link has been sent to your email.");
            } else {
                setLoading(false);
                setError("Email not found. Please try again.");
            }
        }, 2000);  // Simulating a delay of 2 seconds

    };

    return (
        <div className="forgot-container">
            <div className="forgot-header"></div>
            <div className="forgot-form">
                <h2>Forgot Password</h2>
                <p>Enter your registered email address</p>
                <form onSubmit={handleForgotPassword}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                {/* Display success or error message */}
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="back-to-login" style={{ marginLeft: "20px" }}>
                    <Link to="/">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
