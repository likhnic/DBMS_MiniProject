// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnRender = async (props) => {
    let navigate = useNavigate();
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/checkUser/${props.id}`, {
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
    props.setLoading(false);
}

export default OnRender;