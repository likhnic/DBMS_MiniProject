import React, { useEffect, useState } from "react";
import NB from "./components/NB";
import { useNavigate } from "react-router-dom";

const AdminHome = (props) => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
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
            </>}
        </div>
    );
};

export default AdminHome;
