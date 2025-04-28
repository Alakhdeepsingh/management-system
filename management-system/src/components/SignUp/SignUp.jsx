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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "Please enter valid First Name.";
        if (!formData.lastName.trim()) newErrors.lastName = "Please Enter Valid Last Name.";
        if (!formData.email.trim()) newErrors.email = "Please enter valid email.";
        if (!formData.address.trim()) newErrors.address = "Please enter valid address.";
        if (!formData.country.trim()) newErrors.country = "Please select your country.";
        if (!formData.state.trim()) newErrors.state = "Please select your state.";
        if (!formData.city.trim()) newErrors.city = "Please select your city.";
        if (!formData.pincode.trim()) newErrors.pincode = "Please enter valid pincode.";
        if (!formData.mobile.trim()) newErrors.mobile = "Mobile Number is required.";
        if (!formData.password.trim()) newErrors.password = "Must contain at least one number, one uppercase letter, and one lowercase letter, and be at least 8 characters long.";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password should be the same as Password.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Get the formData from the state or form fields
            console.log("formData", formData);

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
                    <input type="text" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />
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
