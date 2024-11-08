import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, LoginPage, SignUpPage, RoomManager, ReservationPage, UsageReportPage, CalendarPage } from '../pages/barrel';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/SignUp',
    element: <SignUpPage />
  },
  {
    path: '/Dashboard',
    element: <Dashboard />
  },
  {
    path: '/RoomManager',
    element: <RoomManager />
  },
  {
    path: '/Reserve',
    element: <ReservationPage />
  },
  {
    path: '/UsageReport',
    element: <UsageReportPage />
  },
  {
    path: '/Calendar',
    element: <CalendarPage />
  }
]);
