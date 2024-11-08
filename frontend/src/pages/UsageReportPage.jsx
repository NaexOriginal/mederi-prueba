import { useState, useEffect } from 'react';
import { Sidebar } from "../components/SideBar";
import { Notification, showErrorToast } from '../components/Notification';
import { DateRangePicker, ReportTable, ReportStatistics, ExportButton } from '../components/usageReport/barrel';

import axios from 'axios';

export const UsageReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [loading, setLoading] = useState(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST}/api/reservation/getReservations`, {
        params: dateRange,
        withCredentials: true
      });
      setReportData(processReportData(response.data));
    } catch (error) {
      showErrorToast('Error al cargar el reporte');
    } finally {
      setLoading(false);
    }
  };

  const processReportData = (data) => {
    const roomStats = data.reduce((acc, reservation) => {
      if (!acc[reservation.meetingRoomId]) {
        acc[reservation.meetingRoomId] = { totalReservations: 0, totalHours: 0, status: reservation.status };
      }
      acc[reservation.meetingRoomId].totalReservations++;
      const hours = (new Date(`2000-01-01T${reservation.endTime}`) - new Date(`2000-01-01T${reservation.startTime}`)) / (1000 * 60 * 60);
      acc[reservation.meetingRoomId].totalHours += hours;
      return acc;
    }, {});
    return Object.entries(roomStats).map(([roomId, stats]) => ({
      roomId,
      ...stats,
      averageHoursPerReservation: (stats.totalHours / stats.totalReservations).toFixed(2),
    }));
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      fetchReportData();
    }
  }, [dateRange]);

  const handleDateChange = (e) => setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  const handleExportPDF = () => console.log("Exportando a PDF...");

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 p-8">
        <Notification />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Reporte de Uso de Salas</h1>
          <ExportButton onClick={handleExportPDF} />
        </div>

        <DateRangePicker dateRange={dateRange} onDateChange={handleDateChange} />
        <ReportTable reportData={reportData} loading={loading} />
        <ReportStatistics reportData={reportData} />
      </div>
    </div>
  );
};
