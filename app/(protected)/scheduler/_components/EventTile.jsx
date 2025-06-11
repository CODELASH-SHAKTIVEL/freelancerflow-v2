import React from 'react';
import { useDraggable } from '@dnd-kit/core';

const EventTile = ({ event, onClick, compact = false, draggable = false }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: event.id,
    disabled: !draggable
  });

  const dragStyle = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 1000 : undefined,
    opacity: isDragging ? 0.5 : undefined,
  };

  const startTime = new Date(event.start);
  const endTime = new Date(event.end);

  return (
    <div
      ref={setNodeRef}
      {...(draggable ? { ...listeners, ...attributes } : {})}
      className={`
        rounded-lg px-3 py-2 text-xs font-medium cursor-pointer
        transition-all duration-200 hover:opacity-90 hover:shadow-md
        ${compact ? 'mb-1' : 'absolute inset-x-1 top-1'}
        ${isDragging ? 'shadow-lg scale-105' : ''}
        border-l-4 backdrop-blur-sm
      `}
      style={{
        backgroundColor: event.color || '#3b82f6',
        color: '#ffffff',
        borderLeftColor: event.color ? `${event.color}CC` : '#1e40af',
        ...dragStyle
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={`${compact ? 'truncate' : ''}`}>
        <div className="font-semibold text-white drop-shadow-sm">{event.title}</div>
        {!compact && (
          <div className="text-xs opacity-90 mt-1">
            {startTime.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })} - {endTime.toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTile;
