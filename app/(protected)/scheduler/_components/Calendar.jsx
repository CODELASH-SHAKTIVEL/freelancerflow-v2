"use client";
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import MonthView from './MonthView';
import WeekView from './WeekView';
import DayView from './DayView';
import EventModal from './EventModel';
import { getEvents, saveEvent, deleteEvent } from '@/lib/localStorage';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { updateEventTime, isToday } from '@/lib/dateUtils';

const Calendar = () => {
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const loadedEvents = getEvents();
    setEvents(loadedEvents);
  }, []);

  const handleEventSave = (eventData) => {
    const savedEvent = saveEvent(eventData);
    setEvents(getEvents());
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSelectedSlot(null);
  };

  const handleEventDelete = (eventId) => {
    deleteEvent(eventId);
    setEvents(getEvents());
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSlotClick = (slotData) => {
    setSelectedSlot(slotData);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const eventId = active.id;
    const newSlot = over.id;
    
    const updatedEvent = updateEventTime(
      events.find(e => e.id === eventId),
      newSlot
    );
    
    if (updatedEvent) {
      saveEvent(updatedEvent);
      setEvents(getEvents());
    }
  };

  const handleDateNavigation = (direction) => {
    const newDate = new Date(currentDate);
    
    if (currentView === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (currentView === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(newDate.getDate() + direction);
    }
    
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDateRangeText = () => {
    if (currentView === 'month') {
      return currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric'
      });
    } else if (currentView === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'long' })} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
      } else {
        return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${endOfWeek.getFullYear()}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
        <div className="max-w-7xl mx-auto">
          <Card className="p-6 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDateNavigation(-1)}
                    className="p-2 hover:bg-accent transition-colors"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={isToday(currentDate) ? "default" : "outline"}
                    size="sm"
                    onClick={goToToday}
                    className="px-4 py-2 text-sm font-medium transition-colors"
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDateNavigation(1)}
                    className="p-2 hover:bg-accent transition-colors"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold text-muted-foreground">
                  {getDateRangeText()}
                </h2>
              </div>
              
              <Tabs value={currentView} onValueChange={setCurrentView}>
                <TabsList className="grid grid-cols-3 w-72 bg-muted/50">
                  <TabsTrigger value="month" className="text-sm font-medium">Month</TabsTrigger>
                  <TabsTrigger value="week" className="text-sm font-medium">Week</TabsTrigger>
                  <TabsTrigger value="day" className="text-sm font-medium">Day</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Tabs value={currentView} className="space-y-4">
              <TabsContent value="month" className="mt-0">
                <MonthView
                  currentDate={currentDate}
                  events={events}
                  onSlotClick={handleSlotClick}
                  onEventClick={handleEventClick}
                />
              </TabsContent>
              
              <TabsContent value="week" className="mt-0">
                <WeekView
                  currentDate={currentDate}
                  events={events}
                  onSlotClick={handleSlotClick}
                  onEventClick={handleEventClick}
                />
              </TabsContent>
              
              <TabsContent value="day" className="mt-0">
                <DayView
                  currentDate={currentDate}
                  events={events}
                  onSlotClick={handleSlotClick}
                  onEventClick={handleEventClick}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={selectedEvent}
          slot={selectedSlot}
          onSave={handleEventSave}
          onDelete={handleEventDelete}
        />
      </div>
    </DndContext>
  );
};

export default Calendar;
