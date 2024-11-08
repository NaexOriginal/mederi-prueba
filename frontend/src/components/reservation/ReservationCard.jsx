
export const ReservationCard = ({ reservation, room, handleCancel }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#EE3F00]">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold">{room?.nameRoom || "Sala"}</h3>
        <p className="text-sm text-gray-500">
          {new Date(reservation.reservationDate).toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          reservation.status === "activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {reservation.status === "activo" ? "Activa" : "Cancelada"}
      </span>
    </div>

    <div className="space-y-2 text-sm">
      <p className="flex items-center">
        <span className="font-medium mr-2">Horario:</span>
        {reservation.startTime} - {reservation.endTime}
      </p>

      {reservation.description && (
        <p className="flex items-center">
          <span className="font-medium mr-2">Descripción:</span>
          {reservation.description}
        </p>
      )}
    </div>

    {reservation.status === "activo" && (
      <div className="mt-4">
        <button
          onClick={() => handleCancel(reservation.id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Cancelar Reserva
        </button>
      </div>
    )}
  </div>
);
