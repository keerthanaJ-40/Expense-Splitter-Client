import React, { useState } from 'react'
import "../styles/signin.css";

const Signin = ({ onClose, onLoginSuccess }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email.length === 0 && !formData.email.endsWith("@example.com")) {
            alert("Must fill the E-mail and must end with @gmail.com");
        }
        else if (formData.password.length < 6) {
            alert("password must contain 6 charecters");
        }
        else if (formData.confirmPassword.length < 6) {
            alert("Confirm password must same the password");
        }
        else {
            alert("Sign In Successfull");
            onLoginSuccess();
            onClose();
        }
        console.log("Form submitted:", formData);
    }

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
                            <button className='pulse-btn'>Sign In</button>
                        </div>

                    </div>
                </form>
            </div>
        </section>
    )
}

export default Signin
