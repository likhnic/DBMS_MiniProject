import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ element: Element, alert:alert }) => {
    const { pathname } = useLocation();
    const token = localStorage.getItem("token");

    let arr = ["/doctor", '/frontdesk', '/frontdesk/register', '/frontdesk/appointment', '/frontdesk/room', '/frontdesk/discharge', '/admin', '/admin/dbadmin', '/admin/frontdesk', '/admin/dataentry', '/admin/doctor']
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        if(pathname === arr[i] && !token){
            alert("Please login to continue", "danger");
            return <Navigate to="/" />;
        }
        if(pathname === arr[i]+'/' && !token){
            alert("Please login to continue", "danger");
            return <Navigate to="/" />;
        }
    }
    return <Element alert={alert} />;
};