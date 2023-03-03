import React from "react";
import "./SideBar.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowDatabaseAdministrator from "./components/databaseAdministrator/ShowDatabaseAdministrator";
import ShowDataEntryOperator from "./components/dataEntryOperator/ShowDataEntryOperator";
import ShowDoctor from "./components/doctor/ShowDoctor";
import ShowFrontDeskOperator from "./components/frontDeskOperator/ShowFrontDeskOperator";

const SideBar = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/dbadmin" exact element={<ShowDatabaseAdministrator />} />
          <Route path="/dataentry" element={<ShowDataEntryOperator />} />
          <Route path="/doctor" element={<ShowDoctor />} />
          <Route path="/frontdesk" element={<ShowFrontDeskOperator />} />
        </Routes>
      </Router>
    </>
  );
};

export default SideBar;
