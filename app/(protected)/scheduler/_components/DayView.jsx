import React from 'react';
import { getHourSlots, formatTime, formatDate, isToday, getDateLabel } from '@/lib/dateUtils';
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
      className={`flex border-b hover:bg-accent/20 cursor-pointer transition-all duration-200 group ${
        isCurrentHour ? 'bg-primary/5 border-primary/30' : ''
      }`}
      onClick={() => onSlotClick({
        date: formatDate(date),
        time: `${hour.toString().padStart(2, '0')}:00`
      })}
    >
      <div className="w-20 p-4 text-xs text-muted-foreground text-right border-r bg-muted/30">
        <div className={`font-medium ${isCurrentHour ? 'text-primary' : ''}`}>
          {formatTime(hour)}
        </div>
      </div>
      <div className="flex-1 p-2 min-h-16 relative group-hover:bg-accent/10 transition-colors">
        {isCurrentHour && (
          <div className="absolute inset-x-2 top-1 h-0.5 bg-primary rounded-full shadow-sm" />
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
    </div>
  );
};

const DayView = ({ currentDate, events, onSlotClick, onEventClick }) => {
  const hours = getHourSlots();

  return (
    <div className="bg-card rounded-xl overflow-hidden border shadow-lg">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-muted/50 to-muted border-b">
        <div className="text-center">
          <div className="text-sm text-muted-foreground font-medium mb-1">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className={`text-3xl font-bold transition-colors ${
              isToday(currentDate) ? 'text-primary' : ''
            }`}>
              {currentDate.getDate()}
            </div>
            <div className="text-lg text-muted-foreground">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
          {isToday(currentDate) && (
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Today
            </div>
          )}
        </div>
      </div>

      {/* Time slots */}
      <div className="max-h-96 overflow-y-auto">
        {hours.map(hour => (
          <TimeSlot
            key={hour}
            date={currentDate}
            hour={hour}
            events={events}
            onSlotClick={onSlotClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DayView;
