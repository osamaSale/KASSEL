import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCourses, login } from "../redux/actions/authActions"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
export const Login = () => {
    const { token } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password })).then((res) => {
            if (res.payload?.status === 201) {
                toast.success(res.payload.message)
                localStorage.setItem('token', res.payload?.token);
                dispatch(getAllCourses())
                navigate('/courses')
            } else {
                toast.error(res.payload.message)
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

