export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const formatTime = (hour) => {
  const time = new Date();
  time.setHours(hour, 0, 0, 0);
  return time.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    hour12: true 
  });
};

export const isSameDay = (date1, date2) => {
  return date1.toDateString() === date2.toDateString();
};

export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // Get first day of month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Get first day of calendar (might be from previous month)
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  // Get last day of calendar (might be from next month)
  const endDate = new Date(lastDay);
  endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
  
  const days = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
};

export const getWeekDays = (date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - day);
  
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  
  return days;
};

export const getHourSlots = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  return hours;
};

export const updateEventTime = (event, newSlot) => {
  if (!event || !newSlot) return null;
  
  const [date, time] = newSlot.split('-');
  const [hour] = time.split(':');
  
  const originalStart = new Date(event.start);
  const originalEnd = new Date(event.end);
  const duration = originalEnd.getTime() - originalStart.getTime();
  
  const newStart = new Date(`${date}T${hour.padStart(2, '0')}:00:00`);
  const newEnd = new Date(newStart.getTime() + duration);
  
  return {
    ...event,
    start: newStart.toISOString(),
    end: newEnd.toISOString()
  };
};

export const isEventInTimeSlot = (event, date, hour) => {
  const eventStart = new Date(event.start);
  const slotStart = new Date(date);
  slotStart.setHours(hour, 0, 0, 0);
  
  const slotEnd = new Date(slotStart);
  slotEnd.setHours(hour + 1, 0, 0, 0);
  
  return eventStart >= slotStart && eventStart < slotEnd;
};

export const getCurrentWeek = () => {
  const now = new Date();
  return getWeekDays(now);
};

export const getCurrentMonth = () => {
  const now = new Date();
  return getDaysInMonth(now);
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addWeeks = (date, weeks) => {
  return addDays(date, weeks * 7);
};

export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};
