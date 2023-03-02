import React from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {

    let navigate = useNavigate()
    const handleOnClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate("/")
    }
    return (
        <div>

            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
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
            </nav>
        </div>
    )
}

export default Navbar