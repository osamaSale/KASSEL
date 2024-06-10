import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
export const Navbar = () => {
    const { user , token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    if (location.pathname === "/" || location.pathname === "/register") { return }
    const handleLogout = () => {
        dispatch(logout());

        navigate('/');
    };
    return (
        <>
            {token !== null &&
                <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                    <div className="container-lg">
                        <Link className="navbar-brand" to="/courses">{user && user.role === 'student' ? 'Student' : 'Teacher'}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/courseList">{user && user.role !== 'student' ? 'Student' : 'Teacher'}</Link>
                                </li>
                            </ul>
                            <button className="btn btn-outline-success" type="submit" onClick={handleLogout}
                            >Logout</button>
                        </div>
                    </div>
                </nav>}
        </>
    );
}

