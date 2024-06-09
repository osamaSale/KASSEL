import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('auth/login', { email, password }).then((res) => {
            toast.success(res.data.message)
            navigate('/courses')
            const user = localStorage.setItem("user", JSON.stringify(res.data.user))
            localStorage.setItem('token', res.data.token);
            if (user.role) {
                navigate('/teacher')
            } else {
                navigate('/teacher')
            }
        })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.message)
                }
            });
    }

    return (

        <div className="container-fluid">
            <div className="row align-items-center justify-content-center min-vh-100 gx-0">
                <div className="col-12 col-md-5 col-lg-4">
                    <div className="card card-shadow p-2">
                        <div className="card-body">
                            <div className="row g-6">
                                <div className="col-12">
                                    <div className="text-center">
                                        <h3 className="fw-bold mb-2">Login</h3>
                                        <p>Follow the easy steps</p>
                                    </div>
                                </div>



                                <div className="col-12 mb-2">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" id="signup-email" name='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                        <label htmlFor="signup-email">Email</label>
                                    </div>
                                </div>

                                <div className="col-12 mb-2">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" id="signup-password" name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                        <label htmlFor="signup-password">Password</label>
                                    </div>
                                </div>

                                <div className="col-12 mb-4">
                                    <button className="btn btn-block btn-lg btn-primary w-100" type="submit" onClick={handleLogin}>Login</button>
                                </div>
                            </div>
                            <div className="text-center mt-8">
                                <p>Already have an account? <Link className="text-decoration-none" to={'/register'}>Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
