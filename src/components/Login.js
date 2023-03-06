import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import NewsCard from './NewsCard';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ ID: "", Password: "" })
    const [news, setNews] = useState([]);
    let navigate = useNavigate()
    const onChange = (e) => {
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
            body: JSON.stringify({ ID, Password: Password })
        })
        const json = await response.json();
        console.log(json);
        if (!json.error) {
            localStorage.setItem('token', json.user)
            console.log(json)
            if (json.type === 0) {
                navigate("/frontdesk", { replace: true })
            }
            else if (json.type === 1) {
                navigate("/dataentryop", { replace: true })
            }
            else if (json.type === 2) {
                navigate("/doctor", { replace: true })
            }
            else if (json.type === 3) {
                navigate("/admin", { replace: true })
            }
            props.alert("Login Successful", "success")
        }
        else {
            // alert(json.error)
            props.alert(json.error, "danger")
        }
    }

    const onRender = () => {

        if (localStorage.getItem('token')) {
            navigate("/", { replace: true })
        }
    }

    const getNews = async () => {
        const response = await fetch('http://localhost:5000/api/frontdeskop/getnews', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const jsonData = await response.json();
        if (jsonData.error)
            console.log(jsonData.error)

        setNews(jsonData.news);
    }

    useEffect(() => {
        getNews();
        onRender();
    }, [])

    /*  useEffect(() => {
    const unblock = navigate('/', { replace: true });
    return unblock;
  }, [navigate]);*/


    return (
        <>
            <div className="container mt-3" style={{padding: "10rem 20rem"}}>
                <div className="card shadow bg-body rounded p-3 mb-5" >
                    <div className="card-body">
                        <h2 className="card-title">Login</h2>
                        <div className="card-text">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Employee ID</label>
                                    <input type="text" name="ID" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" name="Password" className="form-control" id="exampleInputPassword1" onChange={onChange} />
                                </div>
                                <button type="submit" className="mt-3 btn btn-primary" onClick={handleOnClick}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <h1 style={{ textAlign: "center", color: "ButtonText" }} className="mt-3">News and Highlights</h1>
                <div className="row">
                    <NewsCard body="Welcome to RRR Hospital" />
                </div>
                <div className="row">
                    {news.map((news_i, i) => {
                        return <NewsCard body={news_i.body} key={i} />
                    })}
                    {/* <NewsCard body="News 1" /> */}
                </div>
            </div>
        </>
    )
}

export default Login