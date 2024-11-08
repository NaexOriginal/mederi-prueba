
import { useState } from 'react';
import { showSuccessToast, showErrorToast } from '../Notification';

export const RoomForm = ({ room = null, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nameRoom: room?.nameRoom || '',
    capacity: room?.capacity || '',
    location: room?.location || '',
    availableResources: room?.availableResources || { projector: false, whiteboard: false, videoconference: false, wifi: false },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = room ? `updateRoom/${room.id}` : 'createRoom';
      await axios.post(`${import.meta.env.VITE_HOST}/api/rooms/${endpoint}`, formData, { withCredentials: true });
      showSuccessToast(room ? 'Sala actualizada con éxito' : 'Sala creada con éxito');
      onSuccess();
      onClose();
    } catch (error) {
      showErrorToast('Error al procesar la solicitud');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">{room ? 'Editar Sala' : 'Crear Nueva Sala'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={formData.nameRoom} onChange={(e) => setFormData({ ...formData, nameRoom: e.target.value })} required className="mb-4 w-full border rounded p-2" placeholder="Nombre de la Sala" />
          <input type="number" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} required className="mb-4 w-full border rounded p-2" placeholder="Capacidad" />
          <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required className="mb-4 w-full border rounded p-2" placeholder="Ubicación" />
          <div className="space-y-2">
            {Object.entries(formData.availableResources).map(([key, value]) => (
              <div key={key} className="flex items-center">
                <input type="checkbox" checked={value} onChange={(e) => setFormData({ ...formData, availableResources: { ...formData.availableResources, [key]: e.target.checked } })} className="mr-2" />
                <label>{key}</label>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
            <button type="submit" className="bg-[#EE3F00] text-white px-4 py-2 rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
