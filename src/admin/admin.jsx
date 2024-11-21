// src/admin/admin.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ReservationTable from './ReservationTable';
import CafeList from './CafeList';

function Admin() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Routes>
          {/* Reservation Table route (relative to /admin) */}
          <Route path="/" element={<ReservationTable />} />

          {/* Cafe List route (relative to /admin/cafes) */}
          <Route path="cafes" element={<CafeList />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
