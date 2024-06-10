import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { toast } from "react-toastify";
export const Register = () => {
    const { token } = useSelector((state) => state.auth);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register({ name, email, password, role })).then((res) => {
            if (res.payload?.status === 201) {
                toast.success(res.payload.message)
                navigate('/')
            } else {
                toast.error(res.payload?.message)
            }
        });
    }
    return (
        <>
            {token === null ?
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
                </div> : <div class="col-md-12 text-center mt-4">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <p>
                        Sorry, the page you are looking
                        for does not exist.
                    </p>
                </div>}
        </>
    );
}

