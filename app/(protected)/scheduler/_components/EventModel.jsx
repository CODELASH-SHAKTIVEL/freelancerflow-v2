"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Palette,
  AlarmClock,
  Globe,
  User,
} from "lucide-react";
import {
  dateToInputFormat,
  timeToInputFormat,
  createDateFromInput,
} from "@/lib/dateUtils";

export default function EventModal({
  isOpen,
  onClose,
  event,
  slot,
  onSave,
  onDelete,
}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [color, setColor] = useState("#3b82f6");
  const [allDay, setAllDay] = useState(false);
  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [eventType, setEventType] = useState("meeting");

  const colors = [
    { value: "#3b82f6", label: "Blue" },
    { value: "#ef4444", label: "Red" },
    { value: "#22c55e", label: "Green" },
    { value: "#f59e0b", label: "Yellow" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#06b6d4", label: "Cyan" },
    { value: "#f97316", label: "Orange" },
    { value: "#ec4899", label: "Pink" },
  ];

  useEffect(() => {
    if (event) {
      const start = new Date(event.start);
      const end = new Date(event.end);

      setTitle(event.title || "");
      setStartDate(dateToInputFormat(start));
      setStartTime(timeToInputFormat(start));
      setEndDate(dateToInputFormat(end));
      setEndTime(timeToInputFormat(end));
      setColor(event.color || "#3b82f6");
      setAllDay(event.allDay || false);
      setClientName(event.clientName || "");
      setLocation(event.location || "");
      setNotes(event.notes || "");
      setEventType(event.eventType || "meeting");
    } else if (slot) {
      const start = createDateFromInput(slot.date, slot.time);
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      setTitle("");
      setStartDate(slot.date);
      setStartTime(slot.time);
      setEndDate(dateToInputFormat(end));
      setEndTime(timeToInputFormat(end));
      setColor("#3b82f6");
      setAllDay(false);
      setClientName("");
      setLocation("");
      setNotes("");
      setEventType("meeting");
    }
  }, [event, slot]);

  const handleSave = () => {
    const start = createDateFromInput(startDate, startTime);
    const end = createDateFromInput(endDate, endTime);

    if (!title.trim()) return;
    if (end <= start) {
      alert("End time must be after start time");
      return;
    }

    const eventData = {
      id: event?.id || Date.now().toString(),
      title: title.trim(),
      start: start.toISOString(),
      end: end.toISOString(),
      color,
      allDay,
      clientName,
      location,
      notes,
      eventType,
    };

    onSave(eventData);
  };

  const handleDelete = () => {
    if (event && confirm("Are you sure you want to delete this event?")) {
      onDelete(event.id);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
        <div className="overflow-y-auto pr-2 flex-1">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold flex items-center gap-2">
              <Palette className="w-4 h-4" style={{ color }} />
              {event ? "Edit Event" : "Create Event"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 pt-4 pb-2">
            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Client Meeting"
              />
            </div>

            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="milestone">Milestone</SelectItem>
                  <SelectItem value="call">Call</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Client Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location / Link</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Zoom, Google Meet, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              {!allDay && (
                <div className="space-y-2">
                  <Label>Start Time</Label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              {!allDay && (
                <div className="space-y-2">
                  <Label>End Time</Label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-1">
              <Label className="flex items-center gap-2">
                <AlarmClock className="w-4 h-4" />
                All Day
              </Label>
              <Switch checked={allDay} onCheckedChange={setAllDay} />
            </div>

            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional context or details..."
              />
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colors.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full border border-muted"
                          style={{ backgroundColor: c.value }}
                        />
                        {c.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          {event && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              {event ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
