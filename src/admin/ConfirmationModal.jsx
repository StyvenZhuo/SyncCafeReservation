import React from "react";

function ConfirmationModal({ onConfirm, onCancel }) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <p>Confirm to edit?</p>
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-200 px-4 py-2 rounded" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleConfirmSave}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
