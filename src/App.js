import React, { useState } from 'react'
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
import Addtest from './components/Data_Entry_Dashboard/Addtest';
import Addtreatment from './components/Data_Entry_Dashboard/Addtreatment';
import Updateresult from './components/Data_Entry_Dashboard/Updateresults';
import Data_Entry_Dashboard from './components/Data_Entry_Dashboard/Data_Entry_Dashboard';
import Optionspage from './components/Data_Entry_Dashboard/Optionspage';
import ShowDatabaseAdministrator from "./components/Admin_Dashboard/components/databaseAdministrator/ShowDatabaseAdministrator";
import ShowDataEntryOperator from "./components/Admin_Dashboard/components/dataEntryOperator/ShowDataEntryOperator";
import ShowDoctor from "./components/Admin_Dashboard/components/doctor/ShowDoctor";
import ShowFrontDeskOperator from "./components/Admin_Dashboard/components/frontDeskOperator/ShowFrontDeskOperator";
import AdminHome from './components/Admin_Dashboard/AdminHome';
import ViewPrescribes from './components/Data_Entry_Dashboard/ViewPrescribes';
import AddDatabaseAdministrator from './components/Admin_Dashboard/components/databaseAdministrator/AddDatabaseAdministrator';
import AddDataEntryOperator from './components/Admin_Dashboard/components/dataEntryOperator/AddDataEntryOperator';
import AddDoctor from './components/Admin_Dashboard/components/doctor/AddDoctor';
import AddFrontDeskOperator from './components/Admin_Dashboard/components/frontDeskOperator/AddFrontDeskOperator';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {


    const showAlert = (message, type) => {

        console.log(type, message);
        if(type!=null && type === "success"){
            toast.success(message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        else if(type!=null && type === "danger"){
            toast.error(message, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    return (
        <>
            <Router>
                <Navbar alert={showAlert}/>
    
                <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                />
                <Routes>
                    <Route exact path="/" element={<Login alert={showAlert} />} />
                    <Route exact path="/doctor" element={<ProtectedRoute alert={showAlert} element={DoctorDashboard} />} />
                    <Route exact path='/frontdesk' element={<ProtectedRoute alert={showAlert} element={FrontDeskUsr} />}/>
                    <Route exact path='/frontdesk/register' element={<ProtectedRoute alert={showAlert} element={RegisterPatient} />}/>
                    <Route exact path='/frontdesk/appointment' element={<ProtectedRoute alert={showAlert} element={Appointment} />}/>
                    <Route exact path='/frontdesk/room' element={<ProtectedRoute alert={showAlert} element={Stay} />}/>
                    <Route exact path='/frontdesk/discharge' element={<ProtectedRoute alert={showAlert} element={Discharge} />}/>
                    <Route exact path='/dataentryop' element={<ProtectedRoute alert={showAlert} element={Data_Entry_Dashboard} />}/>
                    <Route exact path='/dataentryop/addtest' element={<ProtectedRoute alert={showAlert} element={Addtest} />}/>
                    <Route exact path='/dataentryop/treatment' element={<ProtectedRoute alert={showAlert} element={Addtreatment} />}/>
                    <Route exact path='/dataentryop/updateresult' element={<ProtectedRoute alert={showAlert} element={Updateresult} />}/>
                    <Route exact path='/dataentryop/options' element={<ProtectedRoute alert={showAlert} element={Optionspage} />}/>
                    <Route exact path='/dataentryop/viewprescribes' element={<ProtectedRoute alert={showAlert} element={ViewPrescribes}/>}/>

                    <Route exact path="/admin" element={<ProtectedRoute alert={showAlert} element={AdminHome}/>} />
                    <Route exact path = '/admin/dbadmin' element={<ProtectedRoute alert={showAlert} element={ShowDatabaseAdministrator}/>}/>
                    <Route exact path = '/admin/dbadmin/add' element={<ProtectedRoute alert={showAlert} element={AddDatabaseAdministrator}/>}/>
                    <Route exact path = '/admin/dataentry' element={<ProtectedRoute alert={showAlert} element={ShowDataEntryOperator}/>}/>
                    <Route exact path = '/admin/dataentry/add' element={<ProtectedRoute alert={showAlert} element={AddDataEntryOperator}/>}/>
                    <Route exact path = '/admin/doctor' element={<ProtectedRoute alert={showAlert} element={ShowDoctor}/>}/>
                    <Route exact path = '/admin/doctor/add' element={<ProtectedRoute alert={showAlert} element={AddDoctor}/>}/>
                    <Route exact path = '/admin/frontdesk' element={<ProtectedRoute alert={showAlert}  element={ShowFrontDeskOperator}/>}/>
                    <Route exact path = '/admin/frontdesk/add' element={<ProtectedRoute alert={showAlert}  element={AddFrontDeskOperator}/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App