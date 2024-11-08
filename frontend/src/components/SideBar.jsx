import { Link } from 'react-router-dom';

export const Sidebar = ({ role }) => {
  return (
    <div className="w-64 h-screen bg-[#EE3F00] text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Panel de Control</h2>
      
      <Link to="/Dashboard" className="mb-4 hover:text-gray-300">Dashboard</Link>
      <Link to="/Calendar" className="mb-4 hover:text-gray-300">Calendario de Reuniones</Link>
      <Link to="/Reserve" className="mb-4 hover:text-gray-300">Reservar Sala</Link>

      <Link to="/RoomManager" className="mb-4 hover:text-gray-300">Gestionar Salas</Link>
      <Link to="/UsageReport" className="mb-4 hover:text-gray-300">Reporte de Uso</Link>
    </div>
  );
};

