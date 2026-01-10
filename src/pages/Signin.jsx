import React, { useState } from 'react'
import "../styles/signin.css";

const Signin = ({ onClose, onLoginSuccess }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit clicked", formData);
        if (!formData.email || !formData.email.endsWith("@gmail.com")) {
            alert("Must fill the E-mail and must end with @gmail.com");
            return;
        }
        if (formData.password.length < 6) {
            alert("password must contain 6 charecters");
            return;
        }
        if (formData.password  !== formData.confirmPassword) {
            alert("Confirm password must same the password");
            return;
        }
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            console.log("Registering at:", `${apiUrl}/api/auth/signin`);
            const response = await fetch(`${apiUrl}/api/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        });
            const data = await response.json();
            if (response.ok) {
                alert("Sign In Successful! Please login.");
                onClose();
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Signin Error:", error);
        }
    };

    /* else {alert("Sign In Successfull");
    onLoginSuccess();
    onClose();
}
console.log("Form submitted:", formData);
    }*/

    return (
        <section className='modal-overlay'>
            <div className='main modal-box'>
                <form className='form1 glass-effect' onSubmit={handleSubmit}>

                    {/* close icon */}
                    <div className='container1'>
                        <button
                            type="button"
                            className='close-icon1'
                            onClick={onClose}
                        >
                            &times;
                        </button>
                    </div>

                    {/* title */}
                    <div className='form-name1'>
                        <h1>Sign In</h1>
                        <p className='subtitle'>Create your account securely</p>
                    </div>

                    <div className='form-input1'>

                        <label>E-mail</label><br />
                        <input
                            type="email"
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                            }}
                        />

                        <label>Password</label><br />
                        <input
                            type="password"
                            placeholder='Enter your password'
                            value={formData.password}
                            onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value })
                            }}
                        />

                        <label>Confirm Password</label><br />
                        <input
                            type="password"
                            placeholder='Enter your confirm password'
                            value={formData.confirmPassword}
                            onChange={(e) => {
                                setFormData({ ...formData, confirmPassword: e.target.value })
                            }}
                        />

                        <div className='btn1'>
                            <button type='submit' className='pulse-btn'>Sign In</button>
                        </div>

                    </div>
                </form>
            </div>
        </section>
    )
}

export default Signin;
