import React from 'react';

function CafeList() {
  const cafes = [
    { id: 1, name: 'Cafe A', location: 'Downtown' },
    { id: 2, name: 'Cafe B', location: 'Midtown' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cafes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cafes.map((cafe) => (
          <div key={cafe.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-bold text-lg">{cafe.name}</h2>
            <p>{cafe.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CafeList;
