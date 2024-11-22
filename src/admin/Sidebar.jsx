import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaAlignJustify, FaCalendarAlt, FaCoffee, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  console.log('Sidebar Rendered');
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const location = useLocation();

  const isReservationsActive = location.pathname === '/admin';
  const isCafesActive = location.pathname === '/admin/cafes';
  const isLogoutActive = location.pathname === '/';

  return (
    <div className="pt-10 text-left flex flex-col md:w-2/12 bg-white text-black h-screen p-4">
      <div className="flex-col">
        <h2 className="text-2xl font-bold mb-4 hidden md:block">ADMIN</h2>
        <div className="flex">
          <h2 className="text-md font-semibold m-2 hidden md:block">Menu</h2>
          {/* Hamburger menu for mobile */}
          <button
            onClick={toggleSidebar}
            className="md:hidden text-black focus:outline-none"
          >
            <FaAlignJustify />
          </button>
        </div>
      </div>

      {/* Sidebar content */}
      <nav
        className={`space-y-2 mt-2 ${isOpen ? 'block' : 'hidden'} md:block`}
      >
        <NavLink
          to="/admin" 
          className={` flex block items-center p-2 rounded-lg ${isReservationsActive ? 'bg-indigo-200' : 'bg-slate-200 hover:bg-slate-300'}`}
        >
          <FaCalendarAlt className='mr-2 ml-2'/> Reservations
        </NavLink>

        <NavLink
          to="/admin/cafes" 
          className={`flex items-center block p-2 rounded-lg ${isCafesActive ? 'bg-indigo-200' : 'bg-slate-200 hover:bg-slate-300'}`}
        >
          <FaCoffee className='mr-2 ml-2'/> Cafes
        </NavLink>

        <NavLink
          to="/" 
          className={`flex items-center block p-2 rounded-lg ${isLogoutActive ? 'bg-indigo-200' : 'bg-slate-200 hover:bg-slate-300'}`}
        >
          <FaSignOutAlt className='mr-2 ml-2'/> Log Out
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
