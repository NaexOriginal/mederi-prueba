
export const RoomReservationForm = ({
  rooms,
  formData,
  setFormData,
  handleSubmit,
  loading,
}) => (
  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Sala</label>
        <select
          value={formData.meetingRoomId}
          onChange={(e) => setFormData({ ...formData, meetingRoomId: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
          required
        >
          <option value="">Seleccione una sala</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.nameRoom} - Capacidad: {room.capacity}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          value={formData.reservationDate}
          onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
          required
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hora de inicio</label>
        <input
          type="time"
          value={formData.startTime}
          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Hora de fin</label>
        <input
          type="time"
          value={formData.endTime}
          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
          required
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
          rows="3"
          required
        ></textarea>
      </div>
    </div>

    <div className="mt-6">
      <button
        type="submit"
        disabled={loading}
        className="bg-[#EE3F00] text-white px-4 py-2 rounded hover:bg-[#F86A17] disabled:opacity-50"
      >
        {loading ? "Reservando..." : "Reservar Sala"}
      </button>
    </div>
  </form>
);
