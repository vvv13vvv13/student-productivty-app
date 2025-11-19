'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type Task = { text: string; completed: boolean; deadline?: string };
type TaskContextType = {
  tasks: Task[];
  completedTasks: Task[];
  addTask: (text: string, deadline?: string) => void;
  toggleTask: (index: number) => void;
  deleteTask: (index: number) => void;
  moveTaskToCompleted: (index: number) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]); // State for completed tasks

  useEffect(() => {
    const saved = localStorage.getItem('producty-tasks');
    const savedCompleted = localStorage.getItem('producty-completed-tasks');
    if (saved) setTasks(JSON.parse(saved));
    if (savedCompleted) setCompletedTasks(JSON.parse(savedCompleted));
  }, []);

  useEffect(() => {
    localStorage.setItem('producty-tasks', JSON.stringify(tasks));
    localStorage.setItem('producty-completed-tasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const addTask = (text: string, deadline?: string) => setTasks([...tasks, { text, completed: false, deadline }]);
  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };
  const deleteTask = (index: number) => setTasks(tasks.filter((_, i) => i !== index));

  const moveTaskToCompleted = (index: number) => {
    const taskToMove = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    setCompletedTasks([...completedTasks, taskToMove]);
    // Add points for completed task
    const currentPoints = Number(localStorage.getItem('producty-points') || '0');
    localStorage.setItem('producty-points', String(currentPoints + 10)); // 10 puncte per task
  };

  return (
    <TaskContext.Provider value={{ tasks, completedTasks, addTask, toggleTask, deleteTask, moveTaskToCompleted }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within TaskProvider');
  return ctx;
}