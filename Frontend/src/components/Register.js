import axios from 'axios';
import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")
    const navigate = useNavigate()
    const handleRegister = () => {
        axios.post('auth/register', { name, email, password, role })
            .then((res) => {
                console.log('Registration successful', res.data);
                toast.success(res.data.message)
                navigate('/')
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
                                        <h3 className="fw-bold mb-2">Register</h3>
                                        <p>Allows students and teachers to manage courses</p>
                                    </div>
                                </div>

                                <div className="col-12 mb-2">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="signup-name" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                        <label htmlFor="signup-name">Name</label>
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
                                <div className="col-12 mb-3">
                                    <div className="form-floating">
                                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={(e) => setRole(e.target.value)}>
                                            <option value="student">student</option>
                                            <option value="teacher">teacher</option>
                                        </select>
                                        <label htmlFor="floatingSelect">Works with selects</label>
                                    </div>
                                </div>
                                <div className="col-12 mb-4">
                                    <button className="btn btn-block btn-lg btn-primary w-100" type="submit" onClick={handleRegister}>Create Account</button>
                                </div>
                            </div>
                            <div className="text-center mt-8">
                                <p>Already have an account? <Link className="text-decoration-none" to={"/"}>Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
