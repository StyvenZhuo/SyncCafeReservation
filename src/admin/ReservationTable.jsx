import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 
import ConfirmationModal from './ConfirmationModal';

function ReservationTable() {
  const [reservations, setReservations] = useState([
    { id: 1, cafe: 'Forest', name: 'Cristine Pintar', date: '2024-11-25', time: '18:00', pax: '2', seating: 'Indoor', notes: 'ini harusny text panjanggggggg biar bisa ngok see more see less' },
    { id: 2, cafe: 'Camba', name: 'Fifa emezing', date: '2024-11-26', time: '19:00', pax: '4', seating: 'Outdoor', notes: 'babii' },
    { id: 3, cafe: 'Forest', name: 'Derik Si Playboy', date: '2024-11-26', time: '19:00', pax: '6', seating: 'Outdoor', notes: 'derik playboyyyy' },
    { id: 4, cafe: 'Forest', name: 'Tipen keren', date: '2024-11-22', time: '12:00', pax: '3', seating: 'Indoor', notes: 'ini harusny text panjanggggggg biar bisa ngok see more see less' },
    { id: 5, cafe: 'Archalley', name: 'Elen gacor', date: '2024-11-14', time: '20:00', pax: '4', seating: 'Outdoor', notes: 'babii' },
    { id: 6, cafe: 'Archalley', name: 'jen uwaw', date: '2024-11-30', time: '19:00', pax: '6', seating: 'Outdoor', notes: 'derik playboyyyy' },
  ]);

  const [editing, setEditing] = useState(null);
  const [originalReservations, setOriginalReservations] = useState([...reservations]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [expandedNotes, setExpandedNotes] = useState({}); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(reservations.length / itemsPerPage);
  const paginatedData = reservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const handleInputChange = (e, res, field) => {
    const value = e.target.value;
    setCurrentEdit({
      ...currentEdit,
      [res.id]: { ...currentEdit[res.id], [field]: value },
    });
  };

  const handleSave = () => {
    setModalOpen(true);
  };

  const handleConfirmSave = () => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === editing ? { ...res, ...currentEdit[editing] } : res
      )
    );
    setEditing(null);
    setModalOpen(false);
    setOriginalReservations([...reservations]);
    setCurrentEdit({});
  };

  const toggleNotes = (id) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = (id) => {
    setReservations((prev) => prev.filter((res) => res.id !== id));
  };

  const goToPage = (page) => setCurrentPage(page);

  const handleEditClick = (id) => {
    setOriginalReservations([...reservations]); 
    setEditing(id);
  };

  const handleCancelEdit = () => {
    setReservations([...originalReservations]); 
    setEditing(null);
    setModalOpen(false);
    setCurrentEdit({});
  };

  return (
    <div className="space-y-4 relative">
      <h1 className="sm:text-lg xl:text-2xl font-bold sticky top-0  z-10 p-4">Reservations</h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-fixed text-sm xl:text-base">
          <thead>
            <tr>
              <th className="p-2 xl:p-4 w-1/8">Reserve No</th>
              <th className="p-2 xl:p-4 w-1/8">Cafe</th>
              <th className="p-2 xl:p-4 w-1/8">Guest Name</th>
              <th className="p-2 xl:p-4 w-1/8">Time & Date</th>
              <th className="p-2 xl:p-4 w-1/8">Pax</th>
              <th className="p-2 xl:p-4 w-1/8">Seating</th>
              <th className="p-2 xl:p-4 w-1/8">Notes</th>
              <th className="p-2 xl:p-4 w-1/8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((res, index) => (
              <tr
                key={res.id}
                className={index % 2 === 0 ? 'bg-indigo-200' : 'bg-white'}
              >
                <td className="p-2 xl:p-4">{res.id}</td>
                <td className="p-2 xl:p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.cafe}
                      onChange={(e) => handleInputChange(e, res, 'cafe')}
                    />
                  ) : (
                    res.cafe
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.name}
                      onChange={(e) => handleInputChange(e, res, 'name')}
                    />
                  ) : (
                    res.name
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === res.id ? (
                    <>
                      <input
                        type="date"
                        className="p-1"
                        defaultValue={res.date}
                        onChange={(e) => handleInputChange(e, res, 'date')}
                      />
                      <input
                        type="time"
                        className="p-1"
                        defaultValue={res.time}
                        onChange={(e) => handleInputChange(e, res, 'time')}
                      />
                    </>
                  ) : (
                    `${res.date} ${res.time}`
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.pax}
                      onChange={(e) => handleInputChange(e, res, 'pax')}
                    />
                  ) : (
                    res.pax
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.seating}
                      onChange={(e) => handleInputChange(e, res, 'seating')}
                    />
                  ) : (
                    res.seating
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.notes}
                      onChange={(e) => handleInputChange(e, res, 'notes')}
                    />
                  ) : (
                    <div className="max-w-[200px] h-auto overflow-hidden justify-center">
                      {expandedNotes[res.id] ? (
                        <span>{res.notes}</span>
                      ) : (
                        <span>{res.notes.slice(0, 50)}...</span>
                      )}
                      {res.notes.length > 50 && (
                        <button
                          className="text-blue-500 ml-2"
                          onClick={() => toggleNotes(res.id)}
                        >
                          {expandedNotes[res.id] ? 'See Less' : 'See More'}
                        </button>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-2 xl:p-4 flex space-x-2">
                  {editing === res.id ? (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="mr-2 text-blue-500"
                        onClick={() => handleEditClick(res.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(res.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={goToPreviousPage}
          className="px-3 py-1 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === i + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className="px-3 py-1 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>



      {modalOpen && (
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmSave}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default ReservationTable;
