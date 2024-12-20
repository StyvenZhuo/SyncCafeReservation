import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

function ReservationTable() {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [originalReservations, setOriginalReservations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [expandedNotes, setExpandedNotes] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API_BASE_URL = "https://localhost:7102/api/reservations";

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setReservations(data);
      setOriginalReservations(data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const handleCreate = async (newReservation) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      });
      if (!response.ok) throw new Error("Failed to create");
      fetchReservations();
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  const handleConfirmSave = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/Reservations/Update-Reservation/${editing}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: editing, ...currentEdit[editing] }),
        }
      );
      if (!response.ok) throw new Error("Failed to update");

      setEditing(null);
      setModalOpen(false);
      setCurrentEdit({});
      fetchReservations();
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleDelete = (id) => {
    fetch(`/api/Reservations/Delete-Reservation/${id}`, {
      method: "DELETE",
    })
      .then(() =>
        setReservations((prev) =>
          prev.filter((reservations) => reservations.id !== id)
        )
      )
      .catch((error) => console.error("Error deleting reservations:", error));
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `/api/Reservations/Delete-Reservation/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Failed to delete reservation with ID ${id}`);
  //     }

  //     // Refresh the reservations list
  //     fetchReservations();
  //   } catch (error) {
  //     console.error("Error deleting reservation:", error);
  //   }
  // };

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

  const goToPage = (page) => setCurrentPage(page);

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

  const toggleNotes = (id) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
      <h1 className="sm:text-lg xl:text-2xl font-bold sticky top-0 z-10 p-4">
        Reservations
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white table-fixed text-sm xl:text-base">
          <thead>
            <tr>
              {[
                "Id",
                "UsersId",
                "Username",
                "CafeId",
                "ReservationDate",
                "StartTime",
                "NumberOfGuests",
                "Status",
                "Notes",
                "CreatedAt",
                "UpdatedAt",
                "Actions",
              ].map((header) => (
                <th key={header} className="p-2 xl:p-4 w-1/12">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((res, index) => (
              <tr
                key={res.id}
                className={index % 2 === 0 ? "bg-indigo-200" : "bg-white"}
              >
                {[
                  "id",
                  "usersId",
                  "username",
                  "cafeId",
                  "reservationDate",
                  "startTime",
                  "numberOfGuests",
                  "status",
                  "notes",
                  "createdAt",
                  "updatedAt",
                ].map((field) => (
                  <td className="p-2 xl:p-4" key={field}>
                    {editing === res.id && field !== "id" ? (
                      <input
                        type="text"
                        className="p-1"
                        defaultValue={res[field]}
                        onChange={(e) => handleInputChange(e, res, field)}
                      />
                    ) : (
                      res[field]
                    )}
                  </td>
                ))}
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
              currentPage === i + 1 ? "bg-indigo-500 text-white" : "bg-gray-200"
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
