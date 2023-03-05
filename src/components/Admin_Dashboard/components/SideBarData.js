import React from "react";
import { RiAdminFill } from "react-icons/ri";
import { FaDesktop } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { GiDoctorFace } from "react-icons/gi";
import { RiDatabaseFill } from "react-icons/ri";

export const SideBarData = [
  {
    title: "Home",
    path: "/admin",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Database Administrators",
    path: "/admin/dbadmin",
    icon: <RiAdminFill />,
    cName: "nav-text",
  },
  {
    title: "Data Entry Operators",
    path: "/admin/dataentry",
    icon: <RiDatabaseFill />,
    cName: "nav-text",
  },
  {
    title: "Doctors",
    path: "/admin/doctor",
    icon: <GiDoctorFace />,
    cName: "nav-text",
  },
  {
    title: "Front Desk Operators",
    path: "/admin/frontdesk",
    icon: <FaDesktop />,
    cName: "nav-text",
  }
];
