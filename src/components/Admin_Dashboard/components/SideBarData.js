import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarData = [
  {
    title: 'Home',
    path: '/admin',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Database Administrator',
    path: '/admin/dbadmin',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Data Entry Operator',
    path: '/admin/dataentry',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Doctor',
    path: '/admin/doctor',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Front Desk Operator',
    path: '/admin/frontdesk',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];
