import { useState } from 'react';
import { signup } from '../network/network.js';
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Validate email format
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Validate password length
    const validatePassword = (password) => {
        return password.length >= 4; // Adjust length as needed
    };

    const changeSignup = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = newUser;
        let validationErrors = {};

        // Check for empty fields
        if (!name) validationErrors.name = "Name is required";
        if (!email) validationErrors.email = "Email is required";
        if (!password) validationErrors.password = "Password is required";

        // Validate email format
        if (email && !validateEmail(email)) {
            validationErrors.email = "Invalid email address";
        }

        // Validate password length
        if (password && !validatePassword(password)) {
            validationErrors.password = "Password must be at least 4 characters long";
        }

        // Set error messages and return if there are validation errors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await signup(name, email, password);
            console.log("res", res);
            if (res.success) {
                navigate('/login');
            } else {
                if(!res.success){
                    setErrors({general: res.error.message});
                }
                setErrors({ general: "Signup failed. Please try again." });
            }
        } catch (error) {
            console.error("Error occurred", error);
            setErrors({ general: "An error occurred. Please try again later." });
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={newUser.name}
                        onChange={changeSignup}
                    />
                    
                </div>
                <div>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={newUser.email}
                        onChange={changeSignup}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={newUser.password}
                        onChange={changeSignup}
                    />
                    
                </div>
                <input type='submit' value="Signup" />
                {errors.name && <p className="error">{errors.name}</p>}
                {errors.email && <p className="error">{errors.email}</p>}
                {errors.password && <p className="error">{errors.password}</p>}
                {errors.general && <p className="error">{errors.general}</p>}
            </form>
        </div>
    );
}
