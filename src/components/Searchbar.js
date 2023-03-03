import React, { useState } from 'react'


const Searchbar = () => {
    const [credentials, setCredentials] = useState({ Search: "" })

    const onClick = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleOnClick = async (e) => {
        e.preventDefault();
        const { Search } = credentials;
        console.log(credentials)
        console.log(Search)

        const response = await fetch('http://localhost:5000/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        // const json = await response.json();
        // console.log(json);
        // if (json.success) {
        //     // save the auth token and redirect
        //     localStorage.setItem('token', json.authToken)
        //     navigate("/dashboard", { replace: true })
        // }
    }
    return (
        <>
            <nav className="navbar bg-body-tertiary sticky-top bg-body-tertiary">
                <div className="container-fluid">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onClick} name="Search"></input>
                        <button className="btn btn-outline-success" type="submit" onClick={handleOnClick}>Search</button>
                    </form>
                </div>
            </nav>
        </>
    )
}

export default Searchbar