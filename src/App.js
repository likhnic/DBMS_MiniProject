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
import RegisterPatient from './components/Front_desk/RegisterPatient';
import FrontDeskUsr from './components/Front_desk/FrontDeskUsr';

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path='/admin' element={<Admin_Dashboard/>}/>
                    <Route exact path='/doctor' element={<DoctorDashboard/>}/>
                    <Route exact path='/frontdesk' element={<FrontDeskUsr />}/>
                    <Route exact path='/frontdesk/register' element={<RegisterPatient />}/>
                    <Route exact path='/frontdesk/appointment' element={<FrontDeskUsr />}/>
                    <Route exact path='/frontdesk/room' element={<FrontDeskUsr />}/>
                    <Route exact path='/frontdesk/discharge' element={<FrontDeskUsr />}/>
                </Routes>
            </Router>
        </>
    )
}

export default App