import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ element: Element }) => {
    const { pathname } = useLocation();
    const token = localStorage.getItem("token");

    const checkTokenValidity = async() =>{
        let currUser ;
        if(pathname.startsWith("/doctor")){
            currUser = 2;
        }
        else if(pathname.startsWith("/frontdesk")){
            currUser = 0;
        }
        else if(pathname.startsWith('/dataentry')){
            currUser = 1;
        }
        else if(pathname.startsWith('/admin')){
            currUser = 3;
        }
        else{
            return false;
        }

        const response = await fetch('http://localhost:5000/checkUser/'+currUser, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }

        })
        const json = await response.json();
        console.log(json);
        if(json.error){
            return false;
        }
        return true;
    }

    if ( !token && (["/doctor", '/frontdesk', '/frontdesk/register', '/frontdesk/appointment', '/frontdesk/room', '/frontdesk/discharge'].includes(pathname)) )  {
        return <Navigate to="/" />;
    }
    return <Element />;
};