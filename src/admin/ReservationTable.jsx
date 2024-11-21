import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons
import ConfirmationModal from './ConfirmationModal';

function ReservationTable() {
  const [reservations, setReservations] = useState([
    { id: 1, cafe: 'Forest', name: 'Cristine Pintar', date: '2024-11-25', time: '18:00', pax: '2', seating: 'Indoor', notes: 'ini harusny text panjanggggggg biar bisa ngok see more see less' },
    { id: 2, cafe: 'Camba', name: 'Si Babi Sok Keren', date: '2024-11-26', time: '19:00', pax: '4', seating: 'Outdoor', notes: 'babii' },
    { id: 3, cafe: 'Archalley', name: 'Derik Si Playboy', date: '2024-11-26', time: '19:00', pax: '6', seating: 'Outdoor', notes: 'derik playboyyyy' },
  ]);
  
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [expandedNotes, setExpandedNotes] = useState({}); // state to track expanded notes

  const handleEdit = (id, field, value) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, [field]: value } : res
      )
    );
  };

  const handleConfirmEdit = () => {
    setModalOpen(false);
    setEditing(null);
    setCurrentEdit({});
  };

  const handleInputChange = (e, res, field) => {
    const value = e.target.value;
    setCurrentEdit({ ...currentEdit, [res.id]: { ...currentEdit[res.id], [field]: value } });
    handleEdit(res.id, field, value);
  };

  const handleInputBlur = (e, res, field) => {
    if (!e.target.value) {
      setModalOpen(true);
      setCurrentEdit({ ...currentEdit, [res.id]: { ...currentEdit[res.id], [field]: e.target.value } });
    }
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

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Reservations</h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-fixed">
          <thead>
            <tr>
              <th className="p-4 w-1/8">Reserve No</th>
              <th className="p-4 w-1/8">Cafe</th>
              <th className="p-4 w-1/8">Guest Name</th>
              <th className="p-4 w-1/8">Time & Date</th>
              <th className="p-4 w-1/8">Pax</th>
              <th className="p-4 w-1/8">Seating</th>
              <th className="p-4 w-1/8">Notes</th>
              <th className="p-4 w-1/8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res, index) => (
              <tr key={res.id} className={index % 2 === 0 ? 'bg-indigo-200' : 'bg-white'}>
                <td className="p-4">{res.id}</td>
                <td className="p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.cafe}
                      onChange={(e) => handleInputChange(e, res, 'cafe')}
                      onBlur={(e) => handleInputBlur(e, res, 'cafe')}
                    />
                  ) : (
                    res.cafe
                  )}
                </td>
                <td className="p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.name}
                      onChange={(e) => handleInputChange(e, res, 'name')}
                      onBlur={(e) => handleInputBlur(e, res, 'name')}
                    />
                  ) : (
                    res.name
                  )}
                </td>
                <td className="p-4">
                  {editing === res.id ? (
                    <>
                      <input
                        type="date"
                        className="p-1"
                        defaultValue={res.date}
                        onChange={(e) => handleInputChange(e, res, 'date')}
                        onBlur={(e) => handleInputBlur(e, res, 'date')}
                      />
                      <input
                        type="time"
                        className="p-1"
                        defaultValue={res.time}
                        onChange={(e) => handleInputChange(e, res, 'time')}
                        onBlur={(e) => handleInputBlur(e, res, 'time')}
                      />
                    </>
                  ) : (
                    `${res.date} ${res.time}`
                  )}
                </td>
                <td className="p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.pax}
                      onChange={(e) => handleInputChange(e, res, 'pax')}
                      onBlur={(e) => handleInputBlur(e, res, 'pax')}
                    />
                  ) : (
                    res.pax
                  )}
                </td>
                <td className="p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.seating}
                      onChange={(e) => handleInputChange(e, res, 'seating')}
                      onBlur={(e) => handleInputBlur(e, res, 'seating')}
                    />
                  ) : (
                    res.seating
                  )}
                </td>
                <td className="p-4">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={res.notes}
                      onChange={(e) => handleInputChange(e, res, 'notes')}
                      onBlur={(e) => handleInputBlur(e, res, 'notes')}
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
                <td className="p-4 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => setEditing(editing === res.id ? null : res.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(res.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ConfirmationModal
          onConfirm={handleConfirmEdit}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default ReservationTable;
