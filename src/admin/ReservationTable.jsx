import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

function ReservationTable() {
  const [reservations, setReservations] = useState([
    { id: 1, name: 'John Doe', date: '2024-11-25', time: '18:00' },
    { id: 2, name: 'Jane Smith', date: '2024-11-26', time: '19:00' },
  ]);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Reservations</h1>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-4 border">Name</th>
              <th className="p-4 border">Date</th>
              <th className="p-4 border">Time</th>
              <th className="p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td className="p-4 border">
                  {editing === res.id ? (
                    <input
                      type="text"
                      className="border p-1"
                      defaultValue={res.name}
                      onBlur={(e) =>
                        e.target.value
                          ? handleEdit(res.id, 'name', e.target.value)
                          : setModalOpen(true)
                      }
                    />
                  ) : (
                    res.name
                  )}
                </td>
                <td className="p-4 border">
                  {editing === res.id ? (
                    <input
                      type="date"
                      className="border p-1"
                      defaultValue={res.date}
                      onBlur={(e) =>
                        e.target.value
                          ? handleEdit(res.id, 'date', e.target.value)
                          : setModalOpen(true)
                      }
                    />
                  ) : (
                    res.date
                  )}
                </td>
                <td className="p-4 border">
                  {editing === res.id ? (
                    <input
                      type="time"
                      className="border p-1"
                      defaultValue={res.time}
                      onBlur={(e) =>
                        e.target.value
                          ? handleEdit(res.id, 'time', e.target.value)
                          : setModalOpen(true)
                      }
                    />
                  ) : (
                    res.time
                  )}
                </td>
                <td className="p-4 border">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() =>
                      setEditing(editing === res.id ? null : res.id)
                    }
                  >
                    {editing === res.id ? 'Save' : 'Edit'}
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
