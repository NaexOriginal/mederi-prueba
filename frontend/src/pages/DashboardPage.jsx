import { useState, useEffect } from 'react';
import { Sidebar } from "../components/SideBar";
import { GeneralStats, RecentReservations, QuickActions, RoomStatus } from '../components/dashboard/barrel';

import axios from 'axios';

export const Dashboard = () => {
  const [stats, setStats] = useState({ totalRooms: 0, activeReservations: 0, totalUsers: 0, pendingRequests: 0 });
  const [recentReservations, setRecentReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [roomsRes, reservationsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_HOST}/api/rooms/getRooms`, { withCredentials: true }),
          axios.get(`${import.meta.env.VITE_HOST}/api/reservation/getReservations`, { withCredentials: true })
        ]);

        setStats({
          totalRooms: roomsRes.data.length,
          activeReservations: reservationsRes.data.filter(r => r.status === 'activo').length,
          totalUsers: 0,
          pendingRequests: 0
        });

        setRecentReservations(reservationsRes.data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  const formatTime = (timeString) => new Date(`2000-01-01T${timeString}`).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Panel de Administración</h1>
        <GeneralStats stats={stats} />
        <RecentReservations reservations={recentReservations} loading={loading} formatDate={formatDate} formatTime={formatTime} />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickActions />
          <RoomStatus totalRooms={stats.totalRooms} activeReservations={stats.activeReservations} />
        </div>
      </div>
    </div>
  );
};
