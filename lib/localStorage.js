const STORAGE_KEY = 'calendar_events-v2';

export const getEvents = () => {
  try {
    const events = localStorage.getItem(STORAGE_KEY);
    return events ? JSON.parse(events) : [];
  } catch (error) {
    console.error('Error loading events from localStorage:', error);
    return [];
  }
};

export const saveEvent = (event) => {
  try {
    const events = getEvents();
    const existingIndex = events.findIndex(e => e.id === event.id);
    
    if (existingIndex >= 0) {
      events[existingIndex] = event;
    } else {
      events.push(event);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    return event;
  } catch (error) {
    console.error('Error saving event to localStorage:', error);
    return null;
  }
};

export const deleteEvent = (eventId) => {
  try {
    const events = getEvents();
    const filteredEvents = events.filter(e => e.id !== eventId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEvents));
    return true;
  } catch (error) {
    console.error('Error deleting event from localStorage:', error);
    return false;
  }
};

export const exportEvents = () => {
  const events = getEvents();
  const dataStr = JSON.stringify(events, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'calendar_events.json';
  link.click();
  
  URL.revokeObjectURL(url);
};

export const importEvents = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const events = JSON.parse(e.target.result);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
        resolve(events);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
