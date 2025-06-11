import React from 'react';
import { getDaysInMonth, isSameDay, formatDate, isToday, getDateLabel } from '@/lib/dateUtils';
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
    <div className="bg-card rounded-xl overflow-hidden border shadow-lg">
      {/* Header with day names */}
      <div className="grid grid-cols-7 bg-gradient-to-r from-muted/50 to-muted">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <div key={day} className="p-4 text-center font-semibold text-muted-foreground border-r last:border-r-0">
            <div className="hidden sm:block">{day}</div>
            <div className="sm:hidden">{day.slice(0, 3)}</div>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {daysInMonth.map((day, index) => {
          const dayEvents = getDayEvents(day);
          const isTodayDate = isToday(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();

          return (
            <div
              key={index}
              className={`min-h-32 p-3 border-r border-b last:border-r-0 cursor-pointer transition-all duration-200 hover:bg-accent/30 group ${
                !isCurrentMonth ? 'bg-muted/20 text-muted-foreground' : ''
              } ${isTodayDate ? 'bg-primary/5 ring-2 ring-primary/20' : ''}`}
              onClick={() => handleDayClick(day)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`text-sm font-semibold transition-colors ${
                  isTodayDate 
                    ? 'bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center shadow-md' 
                    : 'group-hover:text-primary'
                }`}>
                  {day.getDate()}
                </div>
                {isTodayDate && (
                  <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                    Today
                  </div>
                )}
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
                  <div className="text-xs text-muted-foreground px-2 py-1 bg-accent/50 rounded text-center font-medium">
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
