import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

    const [credentials, setCredentials] = useState({ ID: "", password: ""})
    let navigate = useNavigate()

    const onClick = (e) => {
        console.log("Hello")
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleOnClick = async (e) => {
        e.preventDefault();
        const { ID, Password } = credentials;
        console.log(credentials)
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/dashboard", { replace: true })
        }
    }

    return (
        <>
            <div className="container mt-3">
                <div className="card" >
                    <div className="card-body">
                        <h2 className="card-title">Login</h2>
                        <div className="card-text">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Employee ID</label>
                                    <input type="text" name="ID" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onClick}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={onClick} />
                                </div>
                               
                                <button type="submit" className="mt-3 btn btn-primary" onClick={handleOnClick}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login