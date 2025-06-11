import React from 'react';
import { getWeekDays, formatTime, getHourSlots, formatDate, isToday, getDateLabel } from '@/lib/dateUtils';
import EventTile from './EventTile';
import { useDroppable } from '@dnd-kit/core';

const TimeSlot = ({ date, hour, events, onSlotClick, onEventClick }) => {
  const { setNodeRef } = useDroppable({
    id: `${formatDate(date)}-${hour.toString().padStart(2, '0')}:00`
  });

  const slotEvents = events.filter(event => {
    const eventStart = new Date(event.start);
    const eventHour = eventStart.getHours();
    const eventDate = formatDate(eventStart);
    return eventDate === formatDate(date) && eventHour === hour;
  });

  const currentHour = new Date().getHours();
  const isCurrentHour = hour === currentHour && isToday(date);

  return (
    <div
      ref={setNodeRef}
      className={`h-16 border-b border-r last:border-r-0 hover:bg-accent/20 cursor-pointer transition-all duration-200 relative group ${
        isCurrentHour ? 'bg-primary/5 border-primary/30' : ''
      }`}
      onClick={() => onSlotClick({
        date: formatDate(date),
        time: `${hour.toString().padStart(2, '0')}:00`
      })}
    >
      {isCurrentHour && (
        <div className="absolute inset-x-1 top-1 h-0.5 bg-primary rounded-full shadow-sm z-10" />
      )}
      {slotEvents.map(event => (
        <EventTile
          key={event.id}
          event={event}
          onClick={() => onEventClick(event)}
          draggable
        />
      ))}
    </div>
  );
};

const WeekView = ({ currentDate, events, onSlotClick, onEventClick }) => {
  const weekDays = getWeekDays(currentDate);
  const hours = getHourSlots();

  return (
    <div className="bg-card rounded-xl overflow-hidden border shadow-lg">
      {/* Header */}
      <div className="grid grid-cols-8 bg-gradient-to-r from-muted/50 to-muted">
        <div className="p-4 border-r bg-muted/30"></div>
        {weekDays.map(day => (
          <div key={day.toISOString()} className="p-4 text-center border-r last:border-r-0">
            <div className="font-medium text-sm text-muted-foreground mb-1">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-lg font-semibold transition-colors ${
              isToday(day) 
                ? 'bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto shadow-md' 
                : ''
            }`}>
              {day.getDate()}
            </div>
            {isToday(day) && (
              <div className="text-xs text-primary font-medium mt-1">
                Today
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="max-h-96 overflow-y-auto">
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-8">
            <div className="p-3 text-xs text-muted-foreground border-r text-right bg-muted/20 font-medium">
              {formatTime(hour)}
            </div>
            {weekDays.map(day => (
              <TimeSlot
                key={`${day.toISOString()}-${hour}`}
                date={day}
                hour={hour}
                events={events}
                onSlotClick={onSlotClick}
                onEventClick={onEventClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
