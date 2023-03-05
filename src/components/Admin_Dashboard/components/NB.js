import React, { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import "./NB.css";
import { IconContext } from "react-icons";

const NB = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={() => setSidebar(true)} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={() => setSidebar(false)}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {SideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key={SideBarData.length+1} className="nav-text">
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem("token");
                  navigate("/");
                  props.alert("Logged out successfully", "success");
                }}
              >
                {<CgLogOut />}
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default NB;
