// src/admin/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="max-width: bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <nav className="space-y-2">
        <NavLink
          to="/admin" // Correct link for Reservations
          className={({ isActive }) =>
            isActive ? 'block p-2 bg-gray-700 rounded' : 'block p-2 hover:bg-gray-700 rounded'
          }
        >
          Reservations
        </NavLink>
        <NavLink
          to="/admin/cafes" // Correct link for Cafes
          className={({ isActive }) =>
            isActive ? 'block p-2 bg-gray-700 rounded' : 'block p-2 hover:bg-gray-700 rounded'
          }
        >
          Cafes
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
