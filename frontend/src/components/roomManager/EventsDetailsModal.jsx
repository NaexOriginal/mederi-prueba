
export const EventDetailsModal = ({ isOpen, onClose, event, room, onCancelReservation, onEditReservation }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Detalles de la Reserva</h2>
        <p><strong>Sala:</strong> {room?.nameRoom}</p>
        <p><strong>Fecha:</strong> {format(event.start, 'dd/MM/yyyy')}</p>
        <p><strong>Hora:</strong> {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}</p>
        <p><strong>Usuario:</strong> {event.userId}</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cerrar</button>
          <button onClick={onEditReservation} className="bg-blue-500 text-white px-4 py-2 rounded">Modificar</button>
          <button onClick={onCancelReservation} className="bg-[#EE3F00] text-white px-4 py-2 rounded">Cancelar Reserva</button>
        </div>
      </div>
    </div>
  );
};
