import { format } from "date-fns";
import { es } from "date-fns/locale";

export const EventModal = ({ event, rooms, onClose }) => {
  const room = rooms.find((room) => room.id === event?.resource)?.nameRoom;

  if (!event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-[#EE3F00]">{event.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          <p className="text-sm"><strong>Fecha:</strong> {format(event.start, "dd/MM/yyyy", { locale: es })}</p>
          <p className="text-sm"><strong>Horario:</strong> {format(event.start, "HH:mm", { locale: es })} - {format(event.end, "HH:mm", { locale: es })}</p>
          <p className="text-sm"><strong>Sala:</strong> {room || "No especificada"}</p>
          {event.description && <p className="text-sm"><strong>Descripción:</strong> {event.description}</p>}
          <p className="text-sm"><strong>Estado:</strong> 
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${event.status === "activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {event.status === "activo" ? "Activa" : "Cancelada"}
            </span>
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
