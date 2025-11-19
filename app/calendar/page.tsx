'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import dynamic from 'next/dynamic';
import 'react-calendar/dist/Calendar.css';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function CalendarPage() {
  const { tasks } = useTasks();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateStr = formatDate(selectedDate);
  const tasksForDay = tasks.filter(t => t.deadline === selectedDateStr);

  // Marchează zilele cu taskuri
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dayStr = formatDate(date);
      const hasTask = tasks.some(t => t.deadline === dayStr);
      if (hasTask) {
        return <span style={{ color: '#a259e6', fontWeight: 'bold', fontSize: 18 }}>•</span>;
      }
    }
    return null;
  };

  return (
    <div className="container">
      <h1 className="title">Calendar</h1>

      <div className="back-container">
        <Link href="/" className="back-button">
          ← Back to Main
        </Link>
      </div>

      <div style={{ margin: '30px 0 20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <Calendar
          onChange={date => setSelectedDate(date as Date)}
          value={selectedDate}
          tileContent={tileContent}
          calendarType="iso8601"
          locale="ro-RO"
          className="react-calendar"
        />
      </div>

      <div style={{ marginTop: 30 }}>
        <h3 style={{ fontSize: 20, marginBottom: 10 }}>Taskuri pentru {selectedDateStr}:</h3>
        {tasksForDay.length === 0 ? (
          <p style={{ color: '#888' }}>Nu ai taskuri pentru această zi.</p>
        ) : (
          <ul className="task-list">
            {tasksForDay.map((t, i) => (
              <li key={i} style={{ fontSize: 17 }}>
                {t.text}
              </li>
            ))}
          </ul>
        )}
      </div>
      <style jsx global>{`
        .react-calendar {
          background: #1e1e2f;
          border-radius: 16px;
          border: 2px solid #a259e6;
          color: #fff;
          box-shadow: 0 4px 24px #a259e633;
          padding: 18px 12px;
          font-family: 'Inter', 'Fredoka', sans-serif;
          margin: 0 auto;
          max-width: 420px;
        }
        .react-calendar__tile {
          background: none;
          color: #fff;
          border-radius: 8px;
          font-size: 18px;
          transition: background 0.2s, color 0.2s;
        }
        .react-calendar__tile--active,
        .react-calendar__tile--now {
          background: #a259e6 !important;
          color: #fff !important;
        }
        .react-calendar__tile:enabled:hover {
          background: #a259e6cc;
          color: #fff;
        }
        .react-calendar__navigation button {
          color: #a259e6;
          font-size: 20px;
        }
        .react-calendar__month-view__weekdays {
          text-align: center;
          color: #a259e6;
          font-weight: 600;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
}