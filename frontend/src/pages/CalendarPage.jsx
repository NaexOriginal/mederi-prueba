import { useState, useEffect } from "react";
import { Sidebar } from "../components/SideBar";
import { Notification, showErrorToast } from "../components/Notification";
import { EventCalendar, EventModal } from "../components/calendar/barrel";

import axios from "axios";

export const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchRooms();
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/reservation/getReservations`, { withCredentials: true });
      const formattedEvents = response.data.map((reservation) => ({
        id: reservation.id,
        title: `Reunión - ${rooms.find((room) => room.id === reservation.meetingRoomId)?.nameRoom || "Sala"}`,
        start: new Date(`${reservation.reservationDate}T${reservation.startTime}`),
        end: new Date(`${reservation.reservationDate}T${reservation.endTime}`),
        resource: reservation.meetingRoomId,
        description: reservation.description,
        status: reservation.status,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      showErrorToast("Error al cargar las reservas");
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/rooms/getRooms`, { withCredentials: true });
      setRooms(response.data);
    } catch (error) {
      showErrorToast("Error al cargar las salas");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-8">
        <Notification />
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Calendario de Reuniones</h2>
        
        <EventCalendar events={events} onEventSelect={(event) => setSelectedEvent(event)} />

        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            rooms={rooms}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
};
