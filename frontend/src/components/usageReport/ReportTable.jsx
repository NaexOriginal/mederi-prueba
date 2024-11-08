
export const ReportTable = ({ reportData, loading }) => (
  loading ? (
    <div className="text-center py-4">Cargando...</div>
  ) : (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Reservas</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horas Totales</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio Horas/Reserva</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reportData.map((room, index) => (
            <tr key={room.roomId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">Sala {room.roomId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.totalReservations}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.totalHours.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.averageHoursPerReservation}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${room.status === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {room.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {reportData.length === 0 && !loading && (
        <div className="text-center py-4 text-gray-500">No hay datos disponibles para el período seleccionado</div>
      )}
    </div>
  )
);
