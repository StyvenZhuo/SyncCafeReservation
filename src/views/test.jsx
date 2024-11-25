<div className="p-4 overflow-auto max-h-[50vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
    {reservations.map((reservation) => (
        <div key={reservation.id} className="flex items-center bg-gray-300 p-4 rounded-lg">
            //make sure this is responsive
            <div>
                <img src={reservation.image}
                alt={reservation.name}
                className=" " /> 
            </div>
            <div>
                <div>
                    <h4>{reservation.name}</h4>
                </div>
                <div> // flex ke samping
                    <div> //flex ke bawah
                        <p>Guest</p>
                        <p>{reservation.guest} | {reservation.pax}</p>
                    </div>
                    <div> //flex ke bawah
                        <p>Date / Time</p>
                        <p>{reservation.date} | {reservation.time}</p>
                    </div>
                </div>
            </div>
            <div className={`font-semibold ${
                reservation.status === "Confirmed" ? "text-green-500" : "text-red-500"
                }`}>
                {reservation.status}
            </div>
        </div>
    ))}
</div>