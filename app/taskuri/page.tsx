'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

export default function TaskuriPage() {
  const [task, setTask] = useState('');
  const { tasks, addTask, toggleTask, deleteTask, moveTaskToCompleted } = useTasks();

  const handleTaskCompletion = (index: number) => {
    moveTaskToCompleted(index); // Move the task to completedTasks
  };

  return (
    <div className="container">
      <h1 className="title">Taskuri</h1> 

       <div className="back-container">
  <Link href="/" className="back-button">
    ← Inapoi
  </Link>
</div>

      <div className="task-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Adaugă un task..."
          className="task-input"

        />
        <button onClick={() => { addTask(task); setTask(''); }}
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
            </label>
            <button onClick={() => deleteTask(i)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}