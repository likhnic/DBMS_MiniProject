import React from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
// import Admin_Dashboard from './components/Admin_Dashboard/Admin_Dashboard';
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
import ShowDatabaseAdministrator from "./components/Admin_Dashboard/components/databaseAdministrator/ShowDatabaseAdministrator";
import ShowDataEntryOperator from "./components/Admin_Dashboard/components/dataEntryOperator/ShowDataEntryOperator";
import ShowDoctor from "./components/Admin_Dashboard/components/doctor/ShowDoctor";
import ShowFrontDeskOperator from "./components/Admin_Dashboard/components/frontDeskOperator/ShowFrontDeskOperator";
import AdminHome from './components/Admin_Dashboard/AdminHome';
import ViewPrescribes from './components/Data_Entry_Dashboard/ViewPrescribes';

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/doctor" element={<ProtectedRoute element={DoctorDashboard} />} />
                    <Route exact path='/frontdesk' element={<ProtectedRoute element={FrontDeskUsr} />}/>
                    <Route exact path='/frontdesk/register' element={<ProtectedRoute element={RegisterPatient} />}/>
                    <Route exact path='/frontdesk/appointment' element={<ProtectedRoute element={Appointment} />}/>
                    <Route exact path='/frontdesk/room' element={<ProtectedRoute element={Stay} />}/>
                    <Route exact path='/frontdesk/discharge' element={<ProtectedRoute element={Discharge} />}/>
                    <Route exact path='/dataentryop' element={<ProtectedRoute element={Data_Entry_Dashboard} />}/>
                    <Route exact path='/dataentryop/addtest' element={<ProtectedRoute element={Addtest} />}/>
                    <Route exact path='/dataentryop/treatment' element={<ProtectedRoute element={Addtreatment} />}/>
                    <Route exact path='/dataentryop/updateresult' element={<ProtectedRoute element={Updateresult} />}/>
                    <Route exact path='/dataentryop/options' element={<ProtectedRoute element={Optionspage} />}/>
                    <Route exact path='/dataentryop/viewprescribes' element={<ProtectedRoute element={ViewPrescribes}/>}/>

                    <Route exact path="/admin" element={<ProtectedRoute element={AdminHome}/>} />
                    <Route exact path = '/admin/dbadmin' element={<ProtectedRoute element={ShowDatabaseAdministrator}/>}/>
                    <Route exact path = '/admin/dataentry' element={<ProtectedRoute element={ShowDataEntryOperator}/>}/>
                    <Route exact path = '/admin/doctor' element={<ProtectedRoute element={ShowDoctor}/>}/>
                    <Route exact path = '/admin/frontdesk' element={<ProtectedRoute  element={ShowFrontDeskOperator}/>}/>
                
                </Routes>
            </Router>
        </>
    )
}

export default App