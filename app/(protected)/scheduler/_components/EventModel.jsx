import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createDateFromInput, dateToInputFormat, timeToInputFormat } from '@/lib/dateUtils';

const EventModal = ({ isOpen, onClose, event, slot, onSave, onDelete }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('#3b82f6');

  const colors = [
    { value: '#3b82f6', label: 'Blue', bg: 'bg-blue-500' },
    { value: '#ef4444', label: 'Red', bg: 'bg-red-500' },
    { value: '#22c55e', label: 'Green', bg: 'bg-green-500' },
    { value: '#f59e0b', label: 'Yellow', bg: 'bg-yellow-500' },
    { value: '#8b5cf6', label: 'Purple', bg: 'bg-purple-500' },
    { value: '#06b6d4', label: 'Cyan', bg: 'bg-cyan-500' },
    { value: '#f97316', label: 'Orange', bg: 'bg-orange-500' },
    { value: '#ec4899', label: 'Pink', bg: 'bg-pink-500' },
  ];

  useEffect(() => {
    if (event) {
      // Editing existing event
      const start = new Date(event.start);
      const end = new Date(event.end);
      
      setTitle(event.title);
      setStartDate(dateToInputFormat(start));
      setStartTime(timeToInputFormat(start));
      setEndDate(dateToInputFormat(end));
      setEndTime(timeToInputFormat(end));
      setColor(event.color || '#3b82f6');
    } else if (slot) {
      // Creating new event
      const start = createDateFromInput(slot.date, slot.time);
      const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour later
      
      setTitle('');
      setStartDate(slot.date);
      setStartTime(slot.time);
      setEndDate(dateToInputFormat(end));
      setEndTime(timeToInputFormat(end));
      setColor('#3b82f6');
    }
  }, [event, slot]);

  const handleSave = () => {
    if (!title.trim()) return;

    const startDateTime = createDateFromInput(startDate, startTime);
    const endDateTime = createDateFromInput(endDate, endTime);

    if (endDateTime <= startDateTime) {
      alert('End time must be after start time');
      return;
    }

    const eventData = {
      id: event?.id || Date.now().toString(),
      title: title.trim(),
      start: startDateTime.toISOString(),
      end: endDateTime.toISOString(),
      color
    };

    onSave(eventData);
  };

  const handleDelete = () => {
    if (event && window.confirm('Are you sure you want to delete this event?')) {
      onDelete(event.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: color }}
            />
            {event ? 'Edit Event' : 'Create Event'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              className="focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm font-medium">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-time" className="text-sm font-medium">Start Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="end-date" className="text-sm font-medium">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time" className="text-sm font-medium">End Time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="focus:ring-2 focus:ring-primary/20">
                <SelectValue>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-medium">{colors.find(c => c.value === color)?.label}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {colors.map(colorOption => (
                  <SelectItem key={colorOption.value} value={colorOption.value}>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-200" 
                        style={{ backgroundColor: colorOption.value }}
                      />
                      <span className="font-medium">{colorOption.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t">
          <div>
            {event && (
              <Button 
                variant="destructive" 
                onClick={handleDelete}
                className="hover:bg-destructive/90"
              >
                Delete Event
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="hover:bg-accent"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!title.trim()}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
