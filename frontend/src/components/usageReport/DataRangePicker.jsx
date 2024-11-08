

export const DateRangePicker = ({ dateRange, onDateChange }) => (
  <div className="mb-6 flex gap-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Fecha Inicio</label>
      <input
        type="date"
        name="startDate"
        value={dateRange.startDate}
        onChange={onDateChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Fecha Fin</label>
      <input
        type="date"
        name="endDate"
        value={dateRange.endDate}
        onChange={onDateChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EE3F00] focus:ring-[#EE3F00]"
      />
    </div>
  </div>
);
