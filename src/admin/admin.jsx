import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ReservationTable from './ReservationTable';
import CafeList from './CafeList';

function Admin() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar className="sticky top-0" />
      {/* Main Content */}
      <div className="flex-1 p-4 overflow-x-auto"> 
        <Routes>
          <Route path="*" element={<ReservationTable />} />
          <Route path="cafes" element={<CafeList />} />
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
