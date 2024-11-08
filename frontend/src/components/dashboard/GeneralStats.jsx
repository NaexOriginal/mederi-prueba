
import { FaUsers, FaDoorOpen, FaCalendarCheck, FaExclamationTriangle } from 'react-icons/fa';
import { StatCard } from './StatCard';

export const GeneralStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard icon={<FaDoorOpen className="text-4xl text-[#EE3F00]" />} title="Salas Totales" value={stats.totalRooms} />
    <StatCard icon={<FaCalendarCheck className="text-4xl text-[#EE3F00]" />} title="Reservas Activas" value={stats.activeReservations} />
    <StatCard icon={<FaUsers className="text-4xl text-[#EE3F00]" />} title="Usuarios Totales" value={stats.totalUsers} />
    <StatCard icon={<FaExclamationTriangle className="text-4xl text-[#EE3F00]" />} title="Solicitudes Pendientes" value={stats.pendingRequests} />
  </div>
);
