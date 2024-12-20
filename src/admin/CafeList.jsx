import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

function CafeList() {
  const [cafes, setCafes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [expandedDescription, setExpandedDescription] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("https://localhost:7222/api/Cafe")
      .then((response) => response.json())
      .then((data) => setCafes(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddCafe = () => {
    const newCafe = {
      id: 0,
      name: "New Cafe",
      address: "New Address",
      phone: "+62 000 0000 0000",
      description: "New description...",
      openHour: "08:00",
      closeHour: "20:00",
    };

    fetch("/api/Cafe/Create-Cafe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCafe),
    })
      .then((response) => response.json())
      .then((data) => setCafes([data, ...cafes]))
      .catch((error) => console.error("Error adding cafe:", error));
  };

  const handleEdit = (cafe) => {
    setEditing(cafe.id);
    setCurrentEdit({
      [cafe.id]: { ...cafe }, // Inisialisasi currentEdit dengan data cafe yang akan diedit
    });
  };

  const handleSave = () => {
    setModalOpen(true);
  };

  const handleConfirmSave = () => {
    const updatedCafe = { ...currentEdit[editing] };

    fetch(`/api/Cafe/Update-Cafe/${editing}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCafe),
    })
      .then((response) => response.json())
      .then((data) => {
        setCafes((prev) =>
          prev.map((cafe) => (cafe.id === editing ? data : cafe))
        );
        setEditing(null);
        setModalOpen(false);
        setCurrentEdit({});
      })
      .catch((error) => console.error("Error updating cafe:", error));
  };

  const handleDelete = (id) => {
    fetch(`/api/Cafe/Delete-Cafe/${id}`, {
      method: "DELETE",
    })
      .then(() => setCafes((prev) => prev.filter((cafe) => cafe.id !== id)))
      .catch((error) => console.error("Error deleting cafe:", error));
  };

  const handleInputChange = (e, cafe, field) => {
    const value = e.target.value;
    setCurrentEdit({
      ...currentEdit,
      [cafe.id]: { ...currentEdit[cafe.id], [field]: value },
    });
  };

  const toggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalPages = Math.ceil(cafes.length / itemsPerPage);
  const paginatedData = cafes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center sticky top-0 z-10 p-4 bg-white">
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
              {/* <th className="p-2 xl:p-4 w-1/8">Phone</th> */}
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
                className={index % 2 === 0 ? "bg-indigo-200" : "bg-white"}
              >
                <td className="p-2 xl:p-4">{cafe.id}</td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="text"
                      className="p-1 w-full border rounded"
                      value={currentEdit[cafe.id]?.name || cafe.name}
                      onChange={(e) => handleInputChange(e, cafe, "name")}
                    />
                  ) : (
                    cafe.name
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="text"
                      className="p-1 w-full border rounded"
                      value={currentEdit[cafe.id]?.address || cafe.address}
                      onChange={(e) => handleInputChange(e, cafe, "address")}
                    />
                  ) : (
                    cafe.address
                  )}
                </td>
                {/* <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="text"
                      className="p-1 w-full border rounded"
                      value={currentEdit[cafe.id]?.phone || cafe.phone}
                      onChange={(e) => handleInputChange(e, cafe, "phone")}
                    />
                  ) : (
                    cafe.phone
                  )}
                </td> */}
                <td className="p-2 xl:p-4">
                  <div className="relative">
                    {expandedDescription[cafe.id] ? (
                      <p>{cafe.description}</p>
                    ) : (
                      <>
                        <p className="truncate">{cafe.description}</p>
                        {cafe.description.length > 20 && (
                          <button
                            className="text-blue-500 text-sm"
                            onClick={() => toggleDescription(cafe.id)}
                          >
                            {expandedDescription[cafe.id]
                              ? "Show less"
                              : "Show more"}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="time"
                      className="p-1 w-full border rounded"
                      value={currentEdit[cafe.id]?.openHour || cafe.openHour}
                      onChange={(e) => handleInputChange(e, cafe, "openHour")}
                    />
                  ) : (
                    cafe.openHour
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <input
                      type="time"
                      className="p-1 w-full border rounded"
                      value={currentEdit[cafe.id]?.closeHour || cafe.closeHour}
                      onChange={(e) => handleInputChange(e, cafe, "closeHour")}
                    />
                  ) : (
                    cafe.closeHour
                  )}
                </td>
                <td className="p-2 xl:p-4">
                  {editing === cafe.id ? (
                    <button
                      className="mr-2 text-green-500"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="mr-2 text-blue-500"
                      onClick={() => handleEdit(cafe)}
                    >
                      <FaEdit />
                    </button>
                  )}
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(cafe.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmSave}
          message="Are you sure you want to save these changes?"
        />
      )}
    </div>
  );
}

export default CafeList;
