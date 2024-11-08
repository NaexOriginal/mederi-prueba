import { useState, useEffect } from "react";
import { Sidebar } from "../components/SideBar";
import axios from "axios";
import {
  Notification,
  showSuccessToast,
  showErrorToast,
} from "../components/Notification";

export const RoomManager = () => {
  const [rooms, setRooms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [formData, setFormData] = useState({
    nameRoom: "",
    capacity: "",
    location: "",
    availableResources: {
      projector: false,
      whiteboard: false,
      videoconference: false,
      wifi: false,
    },
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_HOST}/api/rooms/getRooms`,
        {
          withCredentials: true,
        }
      );
      setRooms(response.data);
    } catch (error) {
      showErrorToast("Error al cargar las salas");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        availableResources: JSON.stringify(formData.availableResources),
      };

      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_HOST}/api/rooms/updateRoom/${
            selectedRoom.id
          }`,
          dataToSend,
          { withCredentials: true }
        );
        showSuccessToast("Sala actualizada exitosamente");
      } else {
        await axios.post(
          `${import.meta.env.VITE_HOST}/api/rooms/createRoom`,
          dataToSend,
          { withCredentials: true }
        );
        showSuccessToast("Sala creada exitosamente");
      }
      resetForm();
      fetchRooms();
    } catch (error) {
      showErrorToast(
        error.response?.data?.error || "Error al procesar la solicitud"
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro de eliminar esta sala?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_HOST}/api/rooms/deleteRoom/${id}`,
          {
            withCredentials: true,
          }
        );
        showSuccessToast("Sala eliminada exitosamente");
        fetchRooms();
      } catch (error) {
        showErrorToast("Error al eliminar la sala");
      }
    }
  };

  const handleEdit = (room) => {
    setIsEditing(true);
    setSelectedRoom(room);
    setFormData({
      nameRoom: room.nameRoom,
      capacity: room.capacity,
      location: room.location,
      availableResources: JSON.parse(room.availableResources),
    });
  };

  const resetForm = () => {
    setIsEditing(false);
    setSelectedRoom(null);
    setFormData({
      nameRoom: "",
      capacity: "",
      location: "",
      availableResources: {
        projector: false,
        whiteboard: false,
        videoconference: false,
        wifi: false,
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-8">
        <Notification />
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          {isEditing ? "Editar Sala" : "Crear Nueva Sala"}
        </h2>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre de la Sala
              </label>
              <input
                type="text"
                value={formData.nameRoom}
                onChange={(e) =>
                  setFormData({ ...formData, nameRoom: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacidad
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ubicación
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recursos Disponibles
              </label>
              <div className="space-y-2">
                {Object.entries(formData.availableResources).map(
                  ([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            availableResources: {
                              ...formData.availableResources,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="rounded border-gray-300 text-[#EE3F00] focus:ring-[#EE3F00]"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="bg-[#EE3F00] text-white px-4 py-2 rounded hover:bg-[#F86A17]"
            >
              {isEditing ? "Actualizar Sala" : "Crear Sala"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Salas Existentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#EE3F00]"
              >
                <h3 className="text-lg font-semibold mb-2">{room.nameRoom}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Capacidad: {room.capacity} personas</p>
                  <p>Ubicación: {room.location}</p>
                  <div>
                    <p className="font-medium">Recursos:</p>
                    <ul className="list-disc list-inside pl-2">
                      {(() => {
                        try {
                          const resources =
                            typeof room.availableResources === "string"
                              ? JSON.parse(room.availableResources)
                              : room.availableResources;

                          return Object.entries(resources).map(
                            ([key, value]) =>
                              value && (
                                <li key={key}>
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </li>
                              )
                          );
                        } catch (error) {
                          console.error("Error parsing resources:", error);
                          return <li>Error al cargar recursos</li>;
                        }
                      })()}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(room)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
