import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // For eye icons from FontAwesome

const Login = () => {
    const savedUser = JSON.parse(localStorage.getItem('users')) || []; // Retrieve the user data from localStorage
    console.log("savedUser", savedUser);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // For error message
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(FaEyeSlash); // Initial icon
    const navigate = useNavigate(); // To redirect to dashboard

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(FaEye);
            setType('text');
        } else {
            setIcon(FaEyeSlash);
            setType('password');
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();

        const matchedUser = savedUser.find(
            user => user.email === email && user.password === password
        );

        if (matchedUser) {
            console.log("matchedUser", matchedUser);

            // ✅ Save current user's email to localStorage
            localStorage.setItem("currentUserEmail", matchedUser.email);

            navigate("/dashboard");
        } else {
            setError("Invalid email or password");
        }
    };


    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword); // Toggle the state
    // };

    return (
        <div className="login-container">
            <div className="login-header"></div>
            <div className="login-form">
                <h2>USER LOGIN</h2>
                {error && <p className="error">{error}</p>} {/* Display error message */}
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <div className="password-wrapper">
                        <input
                            type={type} // Toggle password visibility
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="eye-icon" onClick={handleToggle}>
                            {icon} {/* Render the FaEye or FaEyeSlash icon directly */}
                        </span>
                    </div>
                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot password ?</Link>
                    </div>
                    <div className="sign-up">
                        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                    </div>
                    <div>
                        <button type="submit">LOG ME IN</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
