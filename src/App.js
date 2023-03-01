import React from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Admin_Dashboard from './components/Admin_Dashboard/Admin_Dashboard';
import DoctorDashboard from './components/Doctor/DoctorDashboard';

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path='/admin' element={<Admin_Dashboard/>}/>
                    <Route exact path='/doctor' element={<DoctorDashboard/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App