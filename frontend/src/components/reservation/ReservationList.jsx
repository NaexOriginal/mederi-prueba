import { ReservationCard } from "./ReservationCard";

export const ReservationList = ({ reservations, rooms, handleCancel }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">Mis Reservas</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reservations.length > 0 ? (
        reservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            room={rooms.find((room) => room.id === reservation.meetingRoomId)}
            handleCancel={handleCancel}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-500">
          No tienes reservas activas
        </div>
      )}
    </div>
  </div>
);
