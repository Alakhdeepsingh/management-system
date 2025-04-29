import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

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
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    const API_KEY = "QUlGamNYN1dUblVvSENNZlpTdjRXOTBKWUxlNmk5WTRPM29ZZDlJbA==";

    useEffect(() => {
        fetch("https://api.countrystatecity.in/v1/countries", {
            headers: { "X-CSCAPI-KEY": API_KEY },
        })
            .then(res => res.json())
            .then(data => setCountries(data))
            .catch(err => console.error("Failed to load countries:", err));
    }, []);

    useEffect(() => {
        if (formData.country) {
            fetch(`https://api.countrystatecity.in/v1/countries/${formData.country}/states`, {
                headers: { "X-CSCAPI-KEY": API_KEY },
            })
                .then(res => res.json())
                .then(data => setStates(data))
                .catch(err => console.error("Failed to load states:", err));
        }
    }, [formData.country]);

    useEffect(() => {
        if (formData.state) {
            fetch(
                `https://api.countrystatecity.in/v1/countries/${formData.country}/states/${formData.state}/cities`,
                {
                    headers: { "X-CSCAPI-KEY": API_KEY },
                }
            )
                .then(res => res.json())
                .then(data => setCities(data))
                .catch(err => console.error("Failed to load cities:", err));
        }
    }, [formData.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === "country" ? { state: "", city: "" } : {}),
            ...(name === "state" ? { city: "" } : {}),
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        const nameRegex = /^[A-Za-z\s]{2,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const mobileRegex = /^[6-9]\d{9}$/;
        const addressRegex = /^[a-zA-Z0-9\s,.'-]{10,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const locationRegex = /^[A-Za-z\s]+$/;

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

        if (!formData.country) {
            newErrors.country = "Please select your country.";
        }

        if (!formData.state) {
            newErrors.state = "Please select your state.";
        }

        if (!formData.city) {
            newErrors.city = "Please select your city.";
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
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const existingUser = users.find(user => user.email === formData.email);

            if (existingUser) {
                setErrors({ email: "This email is already registered." });
                return;
            }

            users.push(formData);
            localStorage.setItem("users", JSON.stringify(users));
            setSuccessMessage("Signup successful! Redirecting to login...");

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

            {successMessage && <div className="success-message">{successMessage}</div>}

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
                        <select name="country" value={formData.country} onChange={handleChange}>
                            <option value="">Select Country</option>
                            {countries.map(c => (
                                <option key={c.iso2} value={c.iso2}>{c.name}</option>
                            ))}
                        </select>
                        {errors.country && <span className="error">{errors.country}</span>}
                    </div>
                    <div className="form-group">
                        <select name="state" value={formData.state} onChange={handleChange} disabled={!states.length}>
                            <option value="">Select State</option>
                            {states.map(s => (
                                <option key={s.iso2} value={s.iso2}>{s.name}</option>
                            ))}
                        </select>
                        {errors.state && <span className="error">{errors.state}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <select name="city" value={formData.city} onChange={handleChange} disabled={!cities.length}>
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                        {errors.city && <span className="error">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
                        {errors.pincode && <span className="error">{errors.pincode}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <div style={{ display: "flex", gap: "8px" }}>
                        <input
                            type="text"
                            name="countryCode"
                            placeholder="+91"
                            value={formData.countryCode || "+91"}
                            onChange={handleChange}
                            style={{ width: "70px" }}
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
