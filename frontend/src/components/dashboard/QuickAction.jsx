
export const QuickActions = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
    <div className="space-y-4">
      <button onClick={() => (window.location.href = '/crear-sala')} className="w-full bg-[#EE3F00] text-white px-4 py-2 rounded hover:bg-[#F86A17] transition-colors">Crear Nueva Sala</button>
      <button onClick={() => (window.location.href = '/reporte-uso')} className="w-full bg-[#EE3F00] text-white px-4 py-2 rounded hover:bg-[#F86A17] transition-colors">Ver Reportes</button>
    </div>
  </div>
);
