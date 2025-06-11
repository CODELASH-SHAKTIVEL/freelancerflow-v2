import React from 'react';
import { getDaysInMonth, isSameDay, formatDate } from '@/lib/dateUtils';
import EventTile from './EventTile';

const MonthView = ({ currentDate, events, onSlotClick, onEventClick }) => {
  const daysInMonth = getDaysInMonth(currentDate);
  const today = new Date();

  const getDayEvents = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return isSameDay(eventDate, day);
    });
  };

  const handleDayClick = (day) => {
    onSlotClick({
      date: formatDate(day),
      time: '09:00'
    });
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden border">
      {/* Header with day names */}
      <div className="grid grid-cols-7 bg-muted">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-4 text-center font-medium text-muted-foreground border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {daysInMonth.map((day, index) => {
          const dayEvents = getDayEvents(day);
          const isToday = isSameDay(day, today);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();

          return (
            <div
              key={index}
              className={`min-h-32 p-2 border-r border-b last:border-r-0 cursor-pointer hover:bg-accent/50 transition-colors ${
                !isCurrentMonth ? 'bg-muted/30 text-muted-foreground' : ''
              }`}
              onClick={() => handleDayClick(day)}
            >
              <div className={`text-sm font-medium mb-1 ${
                isToday ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center' : ''
              }`}>
                {day.getDate()}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <EventTile
                    key={event.id}
                    event={event}
                    onClick={() => onEventClick(event)}
                    compact
                  />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground px-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
