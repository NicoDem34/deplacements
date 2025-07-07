import React, { useState } from 'react';
import Calendar from './Calendar';
import EventForm from './EventForm';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

// Palette de couleurs adaptée daltoniens
const COLORS = [
  '#E69F00', '#56B4E9', '#009E73', '#F0E442',
  '#0072B2', '#D55E00', '#CC79A7', '#999999'
];

function getUserColor(usersColors, userName) {
  if (!usersColors[userName]) {
    const usedColors = Object.values(usersColors);
    const available = COLORS.find(c => !usedColors.includes(c)) || COLORS[usedColors.length % COLORS.length];
    usersColors[userName] = available;
  }
  return usersColors[userName];
}

function App() {
  const [events, setEvents] = useState([]);
  const [usersColors, setUsersColors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleAddEvent = (event) => {
    // Attribution couleur
    const color = getUserColor(usersColors, event.user);
    setUsersColors({ ...usersColors, [event.user]: color });
    setEvents([...events, { ...event, id: uuidv4(), color }]);
    setShowForm(false);
    setFeedback({ type: 'success', message: 'Événement ajouté !' });
    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <div className="App">
      <h1>Calendrier des déplacements</h1>
      <button className="add-btn" onClick={() => setShowForm(true)}>+</button>
      {feedback && <div className={`feedback ${feedback.type}`}>{feedback.message}</div>}
      {showForm && (
        <EventForm
          onClose={() => setShowForm(false)}
          onAdd={handleAddEvent}
        />
      )}
      <Calendar
        events={events}
        usersColors={usersColors}
      />
    </div>
  );
}

export default App;
