import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export const Navbar = ({ token, user }) => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        return navigate('/')
    }
    const location = useLocation();
    if (location.pathname === "/" || location.pathname === "/register") { return }
    if (!user) {
        return
    }
    return (

        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">{user.role === 'student' ? 'Student' : 'teacher'}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-success" type="submit" onClick={logout}
                    >Logout</button>
                </div>
            </div>
        </nav>


    );
}
