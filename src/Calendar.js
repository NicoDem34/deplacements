import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, format, isSameMonth, isWithinInterval, parseISO } from 'date-fns';
import './Calendar.css';

function Calendar({ events, usersColors }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const renderHeader = () => (
    <div className="calendar-header">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>&lt;</button>
      <span>{format(currentMonth, 'MMMM yyyy')}</span>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>&gt;</button>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const date = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="calendar-day-name" key={i}>
          {format(addDays(date, i), 'EEE')}
        </div>
      );
    }
    return <div className="calendar-days">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const dayEvents = events.filter(event =>
          isWithinInterval(day, {
            start: parseISO(event.start),
            end: parseISO(event.end)
          })
        );
        days.push(
          <div
            className={`calendar-cell ${!isSameMonth(day, monthStart) ? 'disabled' : ''}`}
            key={day}
          >
            <div className="calendar-date">{formattedDate}</div>
            <div className="calendar-events">
              {dayEvents.map(ev => (
                <div
                  key={ev.id}
                  className="calendar-event"
                  style={{ backgroundColor: ev.color }}
                  title={`${ev.user} : ${ev.title}`}
                >
                  {ev.title}
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day}>{days}</div>
      );
      days = [];
    }
    return <div className="calendar-body">{rows}</div>;
  };

  const renderLegend = () => (
    <div className="calendar-legend">
      <strong>Légende :</strong>
      {Object.entries(usersColors).map(([user, color]) => (
        <span key={user} className="legend-item">
          <span className="legend-color" style={{ backgroundColor: color }}></span>
          {user}
        </span>
      ))}
    </div>
  );

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderLegend()}
    </div>
  );
}

export default Calendar;
