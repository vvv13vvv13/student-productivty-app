 'use client';
import BackButton from '../components/BackButton';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskuriPage() {
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const { tasks, addTask, toggleTask, deleteTask, moveTaskToCompleted } = useTasks();

  const handleTaskCompletion = (index: number) => {
    moveTaskToCompleted(index);
  };

  return (
    <div className="container">
      <h1 className="title">Taskuri</h1>

      <BackButton />

      <div className="task-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Adaugă un task..."
          className="task-input"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="task-input"
          style={{ maxWidth: 180, marginLeft: 8 }}
        />
        <button
          onClick={() => {
            if (task.trim() !== '') {
              addTask(task, deadline);
              setTask('');
              setDeadline('');
            }
          }}
          className="add-button"
        >
          Adaugă
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((t, i) => (
          <li key={i} className={t.completed ? 'completed' : ''}>
            <label>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleTaskCompletion(i)}
              />
              <span>{t.text}</span>
              {t.deadline && (
                <span style={{ marginLeft: 10, fontSize: 13, color: '#888' }}>
                  (deadline: {t.deadline})
                </span>
              )}
            </label>
            <button onClick={() => deleteTask(i)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}