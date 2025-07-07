import React, { useState } from 'react';
import './EventForm.css';

function EventForm({ onAdd, onClose }) {
  const [user, setUser] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !start || !end || !title) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    if (end < start) {
      setError('La date de retour doit être après la date de départ.');
      return;
    }
    onAdd({ user, start, end, title });
  };

  return (
    <div className="event-form-backdrop">
      <form className="event-form" onSubmit={handleSubmit}>
        <h2>Ajouter un déplacement</h2>
        {error && <div className="form-error">{error}</div>}
        <label>
          Nom utilisateur :
          <input type="text" value={user} onChange={e => setUser(e.target.value)} autoFocus />
        </label>
        <label>
          Départ :
          <input type="date" value={start} onChange={e => setStart(e.target.value)} />
        </label>
        <label>
          Retour :
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} />
        </label>
        <label>
          Nom du déplacement :
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <div className="form-actions">
          <button type="submit">Valider</button>
          <button type="button" onClick={onClose}>Annuler</button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
