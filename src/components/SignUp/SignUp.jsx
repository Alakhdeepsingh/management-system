import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        country: "",
        state: "",
        city: "",
        pincode: "",
        mobile: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // If the field is pincode, trigger the API call
        if (name === "pincode" && value.length === 6) {
            fetchLocationData(value);
        }
    };

    const fetchLocationData = async (pincode) => {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const data = await response.json();

            if (data[0].Status === "Success") {
                const postOffice = data[0].PostOffice[0];

                setFormData(prev => ({
                    ...prev,
                    country: "India",
                    state: postOffice.State,
                    city: postOffice.District,
                }));
            } else {
                console.error("Invalid Pincode");
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };


    const validateForm = () => {
        const newErrors = {};

        const nameRegex = /^[A-Za-z\s]{2,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[6-9]\d{9}$/;
        const addressRegex = /^[a-zA-Z0-9\s,.'-]{10,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const locationRegex = /^[A-Za-z\s]+$/; // for country, state, city

        if (!nameRegex.test(formData.firstName)) {
            newErrors.firstName = "Enter a valid First Name (only letters, min 2 characters).";
        }

        if (!nameRegex.test(formData.lastName)) {
            newErrors.lastName = "Enter a valid Last Name (only letters, min 2 characters).";
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid Email.";
        }

        if (!addressRegex.test(formData.address)) {
            newErrors.address = "Enter a valid Address (min 10 characters).";
        }

        if (!formData.country.trim()) {
            newErrors.country = "Please select your country.";
        } else if (!locationRegex.test(formData.country)) {
            newErrors.country = "Country name should contain only letters.";
        }

        if (!formData.state.trim()) {
            newErrors.state = "Please select your state.";
        } else if (!locationRegex.test(formData.state)) {
            newErrors.state = "State name should contain only letters.";
        }

        if (!formData.city.trim()) {
            newErrors.city = "Please select your city.";
        } else if (!locationRegex.test(formData.city)) {
            newErrors.city = "City name should contain only letters.";
        }

        if (!/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = "Enter a valid 6-digit Pincode.";
        }

        if (!mobileRegex.test(formData.mobile)) {
            newErrors.mobile = "Enter a valid 10-digit Mobile Number starting with 6-9.";
        }

        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be 8+ characters, include upper/lowercase & number.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Get the formData from the state or form fields

            // Get the existing users from localStorage (or initialize an empty array if none exist)
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if the email already exists in the users list (you might want to prevent duplicates)
            const existingUser = users.find(user => user.email === formData.email);
            if (existingUser) {
                setErrorMessage("This email is already registered. Please use a different one.");
                return;
            }

            // Add the new user to the users array
            users.push(formData);

            // Save the updated users array back to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Set the success message
            setSuccessMessage("Signup successful! Redirecting to login...");

            // Redirect to login after 2 seconds (to show the success message)
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
    };


    return (
        <div className="signup-container">
            <div className="signup-header"></div>

            <div className="form-toggle">
                <Link to="/" className="toggle-btn">LOGIN</Link>
                <button className="toggle-btn active">SIGNUP</button>
            </div>

            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
                        {errors.country && <span className="error">{errors.country}</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                        {errors.state && <span className="error">{errors.state}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                        {errors.city && <span className="error">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
                        {errors.pincode && <span className="error">{errors.pincode}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            name="countryCode"
                            placeholder="+91"
                            value={formData.countryCode}
                            onChange={handleChange}
                            style={{ width: '70px' }}
                        />
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Number"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.mobile && <span className="error">{errors.mobile}</span>}
                </div>

                <div className="form-group">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <div className="form-group">
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>

                <button type="submit" className="submit-btn">SIGNUP</button>
            </form>
        </div>
    );
};

export default Signup;
