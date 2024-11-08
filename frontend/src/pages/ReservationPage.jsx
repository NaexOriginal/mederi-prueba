import { useState, useEffect } from "react";
import { Sidebar } from "../components/SideBar";
import { Notification, showSuccessToast, showErrorToast } from "../components/Notification";
import { RoomReservationForm, ReservationList } from "../components/reservation/barrel";

import axios from "axios";

export const ReservationPage = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    meetingRoomId: "",
    reservationDate: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  useEffect(() => {
    fetchRooms();
    fetchReservations();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/rooms/getRooms`, { withCredentials: true });
      setRooms(response.data);
    } catch (error) {
      showErrorToast("Error al cargar las salas");
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/reservation/getReservations`, { withCredentials: true });
      setReservations(response.data);
    } catch (error) {
      showErrorToast("Error al cargar las reservas");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_HOST}/api/reservation/createReservation`, formData, { withCredentials: true });
      showSuccessToast("Reserva creada exitosamente");
      fetchReservations();
      resetForm();
    } catch (error) {
      showErrorToast(error.response?.data?.error || "Error al crear la reserva");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (reservationId) => {
    if (window.confirm("¿Está seguro de cancelar esta reserva?")) {
      try {
        await axios.put(`${import.meta.env.VITE_HOST}/api/reservation/cancelReservation/${reservationId}`, {}, { withCredentials: true });
        showSuccessToast("Reserva cancelada exitosamente");
        fetchReservations();
      } catch (error) {
        showErrorToast("Error al cancelar la reserva");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      meetingRoomId: "",
      reservationDate: "",
      startTime: "",
      endTime: "",
      description: "",
    });
  };

  return (
    <div className="flex">
      <Sidebar role="empleado" />
      <div className="flex-1 p-8">
        <Notification />
        <h1 className="text-2xl font-bold text-[#EE3F00] mb-6">Reservar Sala</h1>
        
        <RoomReservationForm
          rooms={rooms}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <ReservationList reservations={reservations} rooms={rooms} handleCancel={handleCancel} />
      </div>
    </div>
  );
};
