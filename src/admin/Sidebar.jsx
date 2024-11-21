import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaAlignJustify, FaCalendarAlt, FaCoffee } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Use location hook to get the current URL
  const location = useLocation();

  // Check if the current path is "/admin" or "/admin/cafes"
  const isReservationsActive = location.pathname === '/admin';
  const isCafesActive = location.pathname === '/admin/cafes';

  return (
    <div className="pt-10 text-left flex flex-col md:w-2/12 bg-white text-black h-screen p-4">
      <div className="flex-col">
        <h2 className="text-2xl font-bold mb-4">ADMIN</h2>
        <div className="flex">
          <h2 className="text-sm font-semibold m-2">Menu</h2>
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
        {/* Reservations NavLink */}
        <NavLink
          to="/admin" // Correct link for Reservations
          className={` flex block items-center p-2 rounded-lg ${isReservationsActive ? 'bg-indigo-200' : 'bg-slate-200 hover:bg-slate-300'}`}
        >
          <FaCalendarAlt className='mr-2 ml-2'/> Reservations
        </NavLink>

        {/* Cafes NavLink */}
        <NavLink
          to="/admin/cafes" // Correct link for Cafes
          className={`flex items-center block p-2 rounded-lg ${isCafesActive ? 'bg-indigo-200' : 'bg-slate-200 hover:bg-slate-300'}`}
        >
          <FaCoffee className='mr-2 ml-2'/> Cafes
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
