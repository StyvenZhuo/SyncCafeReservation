import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';

function CafeList() {
  const [cafes, setCafes] = useState([
    { id: 1, name: 'Camba', address: 'Midtown', phone: '+62 823 4567 7765', description: 'ini harusny text panjanggggggg biar bisa ngok see more see less', openHour: '09:00', closeHour: '00:00' },
    { id: 2, name: 'Forest', address: 'Earlytown', phone: '+62 823 4567 7765', description: 'ini harusny text panjanggggggg biar bisa ngok see more see less', openHour: '10:00', closeHour: '11:00' },
    { id: 3, name: 'Archalley', address: 'Latetown', phone: '+62 823 4567 7765', description: 'ini harusny text panjanggggggg biar bisa ngok see more see less', openHour: '09:00', closeHour: '10:00' },
  ]);

  const [editing, setEditing] = useState(null);
  const [originalCafes, setOriginalCafes] = useState([...cafes]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [expandedDescription, setExpandedDescription] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddCafe = () => {
    const newCafe = {
      id: cafes.length + 1,
      name: 'New Cafe',
      address: 'New Address',
      phone: '+62 000 0000 0000',
      description: 'New description...',
      openHour: '08:00',
      closeHour: '20:00',
    };
    setCafes([newCafe, ...cafes]); // Add the new cafe at the top
  };

  const totalPages = Math.ceil(cafes.length / itemsPerPage);
  const paginatedData = cafes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleInputChange = (e, cafe, field) => {
    const value = e.target.value;
    setCurrentEdit({
      ...currentEdit,
      [cafe.id]: { ...currentEdit[cafe.id], [field]: value },
    });
  };

  const handleSave = () => {
    setModalOpen(true);
  };

  const handleConfirmSave = () => {
    setCafes((prev) =>
      prev.map((cafe) =>
        cafe.id === editing ? { ...cafe, ...currentEdit[editing] } : cafe
      )
    );
    setEditing(null);
    setModalOpen(false);
    setOriginalCafes([...cafes]); 
    setCurrentEdit({});
  };

  const toggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = (id) => {
    setCafes((prev) => prev.filter((cafe) => cafe.id !== id));
  };

  const goToPage = (page) => setCurrentPage(page);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEditClick = (id) => {
    setOriginalCafes([...cafes]); 
    setEditing(id);
  };

  const handleCancelEdit = () => {
    setCafes([...originalCafes]); 
    setEditing(null);
    setModalOpen(false);
    setCurrentEdit({});
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center sticky top-0 z-10 p-4">
        <h1 className="sm:text-lg xl:text-2xl font-bold">Cafe List</h1>
        <button
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
          onClick={handleAddCafe}
        >
          Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-fixed text-sm xl:text-base">
          <thead>
            <tr>
              <th className="p-2 xl:p-4 w-1/8">ID</th>
              <th className="p-2 xl:p-4 w-1/8">Name</th>
              <th className="p-2 xl:p-4 w-1/8">Address</th>
              <th className="p-2 xl:p-4 w-1/8">Phone</th>
              <th className="p-2 xl:p-4 w-1/8">Description</th>
              <th className="p-2 xl:p-4 w-1/8">Open Hour</th>
              <th className="p-2 xl:p-4 w-1/8">Close Hour</th>
              <th className="p-2 xl:p-4 w-1/8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((cafe, index) => (
              <tr
                key={cafe.id}
                className={index % 2 === 0 ? 'bg-indigo-200' : 'bg-white'}
              >
                <td className="p-2 xl:p-4">{cafe.id}</td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={cafe.name}
                      onChange={(e) => handleInputChange(e, cafe, 'name')}
                    />
                  ) : (
                    cafe.name
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={cafe.address}
                      onChange={(e) => handleInputChange(e, cafe, 'address')}
                    />
                  ) : (
                    cafe.address
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={cafe.phone}
                      onChange={(e) => handleInputChange(e, cafe, 'phone')}
                    />
                  ) : (
                    cafe.phone
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="text"
                      className="p-1"
                      defaultValue={cafe.description}
                      onChange={(e) => handleInputChange(e, cafe, 'description')}
                    />
                  ) : (
                    <div className="max-w-[200px]">
                      {expandedDescription[cafe.id] ? (
                        <span>{cafe.description}</span>
                      ) : (
                        <span>{cafe.description.slice(0, 50)}...</span>
                      )}
                      {cafe.description.length > 50 && (
                        <button
                          className="text-blue-500 ml-2"
                          onClick={() => toggleDescription(cafe.id)}
                        >
                          {expandedDescription[cafe.id] ? 'See Less' : 'See More'}
                        </button>
                      )}
                    </div>
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="time"
                      className="p-1"
                      defaultValue={cafe.openHour}
                      onChange={(e) => handleInputChange(e, cafe, 'openHour')}
                    />
                  ) : (
                    cafe.openHour
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="time"
                      className="p-1"
                      defaultValue={cafe.closeHour}
                      onChange={(e) => handleInputChange(e, cafe, 'closeHour')}
                    />
                  ) : (
                    cafe.closeHour
                  )}
                </td>
                <td className="p-2 xl:p-4 flex space-x-2">
                  {editing === cafe.id ? (
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
                        onClick={() => handleEditClick(cafe.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => handleDelete(cafe.id)}
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

export default CafeList;
