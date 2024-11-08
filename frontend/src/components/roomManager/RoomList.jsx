
export const RoomList = ({ rooms, onEditRoom, onDeleteRoom }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Listado de Salas</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recursos</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="px-6 py-4 whitespace-nowrap">{room.nameRoom}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.capacity} personas</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.location}</td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-1">
                  {Object.entries(room.availableResources || {}).map(
                    ([resource, available]) =>
                      available && (
                        <span key={resource} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {resource}
                        </span>
                      )
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button onClick={() => onEditRoom(room)} className="text-blue-600 hover:text-blue-900">Editar</button>
                  <button onClick={() => onDeleteRoom(room.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
