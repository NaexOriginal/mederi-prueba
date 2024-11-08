
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';

import es from 'date-fns/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export const CalendarRoom = ({ events, rooms, onEventSelect }) => (
  <div className="h-[600px]">
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      views={['month', 'week', 'day']}
      style={{ height: '100%' }}
      onSelectEvent={onEventSelect}
      messages={{
        next: 'Siguiente',
        previous: 'Anterior',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        noEventsInRange: 'No hay reuniones programadas',
      }}
      eventPropGetter={() => ({
        style: {
          backgroundColor: '#EE3F00',
          color: 'white',
          borderRadius: '5px',
          border: 'none',
          display: 'block',
        },
      })}
    />
  </div>
);
