'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Task = { text: string; completed: boolean };
type TaskContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (index: number) => void;
  deleteTask: (index: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('producty-tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('producty-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => setTasks([...tasks, { text, completed: false }]);
  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };
  const deleteTask = (index: number) => setTasks(tasks.filter((_, i) => i !== index));

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}