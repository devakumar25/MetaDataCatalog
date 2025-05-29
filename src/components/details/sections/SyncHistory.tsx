import React, { useState, useMemo } from 'react';
import * as Icons from 'lucide-react';

interface SyncEvent {
  time: string;
  status: 'success' | 'failed';
  reason?: string;
  duration?: string;
  rowsProcessed?: number;
}

interface DaySyncStats {
  total: number;
  success: number;
  failed: number;
}

interface SyncHistoryProps {
  initialDate?: string;
}

const generateSyncEvents = (date: string): SyncEvent[] => {
  const failureReasons = [
    'Connection timeout',
    'Schema validation error',
    'API rate limit exceeded',
    'Insufficient permissions',
    'Data integrity check failed',
    'Memory limit exceeded',
    'Network connectivity issues',
    'Database deadlock detected',
    'Invalid credentials',
    'Resource constraints'
  ];

  // Generate between 4-8 events for the day
  const numEvents = 4 + Math.floor(Math.random() * 5);
  const events: SyncEvent[] = [];

  for (let i = 0; i < numEvents; i++) {
    const hour = Math.floor(24 / numEvents * i);
    const minute = Math.floor(Math.random() * 60);
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;

    // Vary success rate based on time of day
    const isSuccess = Math.random() > (hour >= 22 || hour <= 4 ? 0.4 : 0.2); // More failures during night hours

    const event: SyncEvent = {
      time: `${date} ${displayHour}:${formattedMinute} ${period}`,
      status: isSuccess ? 'success' : 'failed',
      duration: `${Math.floor(Math.random() * 10) + 1}m ${Math.floor(Math.random() * 50) + 10}s`,
      rowsProcessed: isSuccess ? Math.floor(Math.random() * 100000) + 1000 : undefined
    };

    if (!isSuccess) {
      event.reason = failureReasons[Math.floor(Math.random() * failureReasons.length)];
    }

    events.push(event);
  }

  return events;
};

// Cache sync events for each date
const useSyncEvents = () => {
  const cache = useMemo(() => new Map<string, SyncEvent[]>(), []);

  const getEventsForDate = (date: string) => {
    if (!cache.has(date)) {
      cache.set(date, generateSyncEvents(date));
    }
    return cache.get(date)!;
  };

  const getDaySyncStats = (date: string): DaySyncStats => {
    const events = getEventsForDate(date);
    const success = events.filter(e => e.status === 'success').length;
    return {
      total: events.length,
      success,
      failed: events.length - success
    };
  };

  return { getEventsForDate, getDaySyncStats };
};

const SyncCalendar: React.FC<{ onDateSelect: (date: string) => void }> = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const { getDaySyncStats } = useSyncEvents();
  
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  
  const days = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);
  const startingDay = firstDayOfMonth.getDay();
  const monthName = currentMonth.toLocaleString('default', { month: 'long' });

  const getDateString = (day: number) => {
    return `2024-03-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">{monthName} {currentMonth.getFullYear()}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Icons.ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Icons.ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
        {Array(startingDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className="h-12" />
        ))}
        {days.map(day => {
          const dateString = getDateString(day);
          const stats = getDaySyncStats(dateString);
          
          return (
            <div
              key={day}
              className="relative"
              onMouseEnter={() => setHoveredDate(dateString)}
              onMouseLeave={() => setHoveredDate(null)}
            >
              <button
                onClick={() => onDateSelect(dateString)}
                className="w-full h-12 rounded-lg flex items-center justify-center overflow-hidden relative"
                style={{
                  background: stats.total === 0 
                    ? '#f3f4f6' 
                    : `linear-gradient(to right, #50C878 ${Math.round(stats.success / stats.total * 100)}%, #EF4444 ${Math.round(stats.success / stats.total * 100)}%, #EF4444 ${Math.round(stats.failed / stats.total * 100)}%)`
                }}
              >
                <span className={`text-sm font-medium relative z-10 ${stats.total === 0 ? 'text-gray-500' : 'text-white'}`}>
                  {day}
                </span>
              </button>
              {hoveredDate === dateString && stats.total > 0 && (
                <div className="absolute z-10 bg-gray-900 text-white text-xs rounded py-1 px-2 -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  {stats.success} success, {stats.failed} failure
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SyncHistory: React.FC<SyncHistoryProps> = ({ initialDate }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(initialDate || null);
  const { getEventsForDate } = useSyncEvents();
  
  const syncEvents = useMemo(() => 
    selectedDate ? getEventsForDate(selectedDate) : [],
    [selectedDate]
  );

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="space-y-6">
      <SyncCalendar onDateSelect={handleDateSelect} />
      {selectedDate && syncEvents.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Sync Events for {selectedDate}</h3>
          <div className="space-y-3">
            {syncEvents.map((event, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  event.status === 'success' 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900">{event.time}</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        event.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    {event.reason && (
                      <p className="text-sm text-gray-600">Error: {event.reason}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Duration: {event.duration}</span>
                      {event.rowsProcessed && (
                        <span>{event.rowsProcessed.toLocaleString()} rows processed</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};