import React, { useEffect, useState } from "react";
import NB from "./components/NB";
import { useNavigate } from "react-router-dom";

const AdminHome = (props) => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({news:""});
    const onRenderpage = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/checkUser/3', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        }
        )
        const json = await response.json();
        if (json.error) {
            navigate("/", { replace: true })
        }
        setLoading(false);
    }

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        // console.log(e.target.name, e.target.value);
    }

    const handleOnClick = async (e) => {
        e.preventDefault();
        const { news } = data;
        console.log(news)
        const response = await fetch(
            'http://localhost:5000/api/admin/addnews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify({news})  
            }
        )
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            props.alert("News added successfully", "success")
            // setData({news:""})
            navigate("/admin", { replace: true })
        }
        else if(!json.success){
            props.alert(json.error, "danger")
        }
    }

    useEffect(() => {
        onRenderpage();
    }, [])
    return (
        <div>
            {!loading && <> <NB alert={props.alert} />
                <div className="text-center">
                    <h1 style={{ textAlign: "center" }} className="mt-3">
                        Hospital Management System<br></br> Database Administrator Homepage
                    </h1>
                </div>
                <div className="container-sm" style={{ padding: "20px 200px" }}>
                    <div className="card shadow bg-body p-1 mb-5 rounded">
                        <div className="card-body">
                            <p>
                                Welcome to the Hospital Management System Database Administrator
                                Homepage! As the database administrator for the Hospital
                                Management System, you play a critical role in ensuring that
                                patient information is stored, managed, and protected
                                appropriately. This homepage is designed to provide you with easy
                                access to the tools and resources you need to perform your job
                                effectively.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container-sm" style={{ padding: "20px 200px" }}>
                    <form className='form-control shadow bg-body p-3 mb-5'>
                        <div className="form-outline mb-4">
                            <textarea name="news" className="form-control" placeholder="What's the News?" onChange={handleOnChange}/>
                        </div>
                        <div className="text-center">
                            <div className="col">
                                <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleOnClick}>Add News</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>}
        </div>
    );
};

export default AdminHome;
