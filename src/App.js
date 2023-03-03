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
import Stay from './components/Front_desk/Stay';
import Discharge from './components/Front_desk/Discharge';
import Appointment from './components/Front_desk/Appointment';
import { ProtectedRoute } from './components/ProtectedRoute';
import Addtest from './components/Data_Entry_Dashboard/Addtest'
import Addtreatment from './components/Data_Entry_Dashboard/Addtreatment'
import Updateresult from './components/Data_Entry_Dashboard/Updateresults'
import Data_Entry_Dashboard from './components/Data_Entry_Dashboard/Data_Entry_Dashboard'
import Optionspage from './components/Data_Entry_Dashboard/Optionspage';

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path='/admin' element={<Admin_Dashboard/>}/>
                    <Route exact path="/doctor" element={<ProtectedRoute element={DoctorDashboard} />} />
                    <Route exact path='/frontdesk' element={<ProtectedRoute element={FrontDeskUsr} />}/>
                    <Route exact path='/frontdesk/register' element={<ProtectedRoute element={RegisterPatient} />}/>
                    <Route exact path='/frontdesk/appointment' element={<ProtectedRoute element={Appointment} />}/>
                    <Route exact path='/frontdesk/room' element={<ProtectedRoute element={Stay} />}/>
                    <Route exact path='/frontdesk/discharge' element={<ProtectedRoute element={Discharge} />}/>
                    <Route exact path='/dataentryop' element={<Data_Entry_Dashboard />}/>
                    <Route exact path='/dataentryop/addtest' element={<Addtest />}/>
                    <Route exact path='/dataentryop/treatment' element={<Addtreatment />}/>
                    <Route exact path='/dataentryop/updateresult' element={<Updateresult />}/>
                    <Route exact path='/dataentryop/options' element={<Optionspage />}/>
                
                </Routes>
            </Router>
        </>
    )
}

export default App