import React from 'react';
import { getWeekDays, formatTime, getHourSlots, formatDate } from '@/lib/dateUtils';
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

  return (
    <div
      ref={setNodeRef}
      className="h-16 border-b border-r last:border-r-0 hover:bg-accent/30 cursor-pointer transition-colors relative"
      onClick={() => onSlotClick({
        date: formatDate(date),
        time: `${hour.toString().padStart(2, '0')}:00`
      })}
    >
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
    <div className="bg-card rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="grid grid-cols-8 bg-muted">
        <div className="p-4 border-r"></div>
        {weekDays.map(day => (
          <div key={day.toISOString()} className="p-4 text-center border-r last:border-r-0">
            <div className="font-medium text-sm text-muted-foreground">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-lg font-semibold ${
              day.toDateString() === new Date().toDateString() 
                ? 'bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto mt-1' 
                : ''
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div className="max-h-96 overflow-y-auto">
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-8">
            <div className="p-2 text-xs text-muted-foreground border-r text-right">
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
