import { create } from "zustand";

const useStore = create((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  completedTasks: JSON.parse(localStorage.getItem("Completedtasks")) || [],

  addTask: (task) =>
    set((state) => {
      const newTasks = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { tasks: newTasks };
    }),

  deleteTask: (taskId, fromCompleted = false) =>
    set((state) => {
      const newTasks = fromCompleted
        ? state.completedTasks.filter((task) => task.id !== taskId)
        : state.tasks.filter((task) => task.id !== taskId);

      if (fromCompleted) {
        localStorage.setItem("Completedtasks", JSON.stringify(newTasks));
      } else {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
      }

      return fromCompleted ? { completedTasks: newTasks } : { tasks: newTasks };
    }),

  moveTaskToCompleted: (taskId) =>
    set((state) => {
      const taskToMove = state.tasks.find((task) => task.id === taskId);
      if (!taskToMove) return { tasks: state.tasks };

      const newTasks = state.tasks.filter((task) => task.id !== taskId);
      const completedTask = { ...taskToMove, isCompleted: true };
      const newCompletedTasks = [...state.completedTasks, completedTask];

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      localStorage.setItem("Completedtasks", JSON.stringify(newCompletedTasks));

      return { tasks: newTasks, completedTasks: newCompletedTasks };
    }),

  moveTaskToPending: (taskId) =>
    set((state) => {
      const taskToMove = state.completedTasks.find(
        (task) => task.id === taskId
      );
      if (!taskToMove) return { completedTasks: state.completedTasks };

      const newCompletedTasks = state.completedTasks.filter(
        (task) => task.id !== taskId
      );
      const taskToRevert = { ...taskToMove, isCompleted: false };
      const newTasks = [...state.tasks, taskToRevert];

      localStorage.setItem("tasks", JSON.stringify(newTasks));
      localStorage.setItem("Completedtasks", JSON.stringify(newCompletedTasks));

      return { tasks: newTasks, completedTasks: newCompletedTasks };
    }),
}));

export default useStore;
