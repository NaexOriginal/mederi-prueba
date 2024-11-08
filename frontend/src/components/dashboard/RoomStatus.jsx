
export const RoomStatus = ({ totalRooms, activeReservations }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Estado de las Salas</h2>
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span>Salas Disponibles</span>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">{totalRooms - activeReservations}</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Salas Ocupadas</span>
        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full">{activeReservations}</span>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-[#EE3F00] h-2.5 rounded-full" style={{ width: `${(activeReservations / totalRooms) * 100}%` }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Ocupación actual: {((activeReservations / totalRooms) * 100).toFixed(1)}%</p>
      </div>
    </div>
  </div>
);
