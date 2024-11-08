import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { eventStyle } from "./barrel";

import es from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { es };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay eventos en este rango",
};

export const EventCalendar = ({ events, onEventSelect }) => (
  <div style={{ height: "700px" }} className="bg-white p-6 rounded-lg shadow-md">
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "100%" }}
      messages={messages}
      eventPropGetter={eventStyle}
      onSelectEvent={onEventSelect}
      views={["month", "week", "day", "agenda"]}
      defaultView="month"
      tooltipAccessor={(event) => event.description}
      popup
    />
  </div>
);
