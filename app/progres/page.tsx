'use client';

import Link from 'next/link';
import { useTasks } from '../context/TaskContext';

export default function ProgresPage() {
  const { completedTasks } = useTasks();

  return (
    <div className="progres-container">
      <h1 className="progres-title">Progres</h1>

      <div className="back-container">
        <Link href="/" className="back-button">
          ← Back to Main
        </Link>
      </div>

      <h2 className="progres-subtitle">Taskuri completate:</h2>
      {completedTasks.length > 0 ? (
        <ul className="task-list">
          {completedTasks.map((task, index) => (
            <li key={index} className="completed-task">
              {task.text}
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks">Nu ai completat încă niciun task.</p>
      )}
    </div>
  );
}