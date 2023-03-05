import React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar = (props) => {

    let navigate = useNavigate()
    let {pathname} = useLocation()
    const handleOnClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        props.alert("Logged out successfully", "success")
        navigate("/")
    }
    return (
        <div>

            {!pathname.startsWith('/admin') && (<nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Hospital Management System</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {!localStorage.getItem('token') && 
                                <li className="nav-item">
                                    <Link className="btn btn-dark" to="/">
                                        Login
                                    </Link>
                                </li>}
                            {localStorage.getItem('token') && <li className="nav-item">
                                <button className="btn btn-dark" onClick={handleOnClick}>
                                    Logout
                                </button>
                            </li>}
                        </ul>

                    </div>
                </div>
            </nav>)}
        </div>
    )
}

export default Navbar