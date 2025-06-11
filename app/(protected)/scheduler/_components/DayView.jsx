import React from 'react';
import { getHourSlots, formatTime, formatDate } from '@/lib/dateUtils';
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
  const isCurrentHour = hour === currentHour && formatDate(date) === formatDate(new Date());

  return (
    <div
      ref={setNodeRef}
      className={`flex border-b hover:bg-accent/30 cursor-pointer transition-colors ${
        isCurrentHour ? 'bg-primary/10' : ''
      }`}
      onClick={() => onSlotClick({
        date: formatDate(date),
        time: `${hour.toString().padStart(2, '0')}:00`
      })}
    >
      <div className="w-20 p-4 text-xs text-muted-foreground text-right border-r">
        {formatTime(hour)}
      </div>
      <div className="flex-1 p-2 min-h-16 relative">
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
    <div className="bg-card rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="p-6 bg-muted border-b">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
          </div>
          <div className={`text-2xl font-bold ${
            currentDate.toDateString() === new Date().toDateString() 
              ? 'text-primary' 
              : ''
          }`}>
            {currentDate.getDate()}
          </div>
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
