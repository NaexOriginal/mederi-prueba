
export const ReportStatistics = ({ reportData }) => {
  const totalHours = reportData.reduce((acc, room) => acc + room.totalHours, 0);
  const occupancyRate = reportData.length > 0 
    ? `${((totalHours / (reportData.length * 24 * 30)) * 100).toFixed(1)}%`
    : '0%';

  const mostUsedRoom = reportData.length > 0 
    ? `Sala ${reportData.reduce((prev, current) => prev.totalHours > current.totalHours ? prev : current).roomId}`
    : 'N/A';

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Estadísticas Generales</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">Tasa de Ocupación</p>
          <p className="text-2xl font-bold text-[#EE3F00]">{occupancyRate}</p>
        </div>
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">Sala Más Utilizada</p>
          <p className="text-2xl font-bold text-[#EE3F00]">{mostUsedRoom}</p>
        </div>
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">Total Horas Reservadas</p>
          <p className="text-2xl font-bold text-[#EE3F00]">{totalHours.toFixed(1)}</p>
        </div>
      </div>
    </div>
  );
};
