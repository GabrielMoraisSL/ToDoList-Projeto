import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTasks";
import Title from "./components/Title";
import Completes from "./components/Completes";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const [CompletedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("Completedtasks")) || []
  );
  useEffect(() => {
    localStorage.setItem("Completedtasks", JSON.stringify(CompletedTasks));
  }, [CompletedTasks]);

  function onDeleteClick(taskId, fromCompleted = false) {
    if (fromCompleted) {
      const newCompletedTasks = CompletedTasks.filter(
        (task) => task.id !== taskId
      );
      setCompletedTasks(newCompletedTasks);
    } else {
      const newTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(newTasks);
    }
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  function onTaskMoveClick(taskId) {
    const taskToMove = tasks.find((task) => task.id === taskId);

    if (taskToMove) {
      const newTasks = tasks.filter((task) => task.id !== taskId);

      const completedTask = { ...taskToMove, isCompleted: true };

      const newCompletedTasks = [...CompletedTasks, completedTask];

      setTasks(newTasks);
      setCompletedTasks(newCompletedTasks);
    }
  }

  function onCompletedTaskClick(taskId) {
    const taskToMove = CompletedTasks.find((task) => task.id === taskId);

    if (taskToMove) {
      // Remover a tarefa da lista CompletedTasks
      const newCompletedTasks = CompletedTasks.filter(
        (task) => task.id !== taskId
      );

      // Criar a tarefa de volta na lista Tasks
      const taskToRevert = { ...taskToMove, isCompleted: false };

      // Adicionar a tarefa de volta na lista Tasks
      const newTasks = [...tasks, taskToRevert];

      setCompletedTasks(newCompletedTasks);
      setTasks(newTasks);
    }
  }

  return (
    <div className="w-screen h-screen bg-blue-500 justify-center p-6">
      <Title>Gerenciador de Tarefas</Title>
      <div className="flex justify-center p-3 gap-4">
        <div className="w-[400px] space-y-4">
          <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
          <Tasks
            tasks={tasks}
            onTaskMoveClick={onTaskMoveClick}
            onDeleteClick={onDeleteClick}
          />
        </div>
        <div className="w-[400px]">
          <Completes
            Completedtasks={CompletedTasks}
            onCompletedTaskClick={onCompletedTaskClick}
            onDeleteClick={onDeleteClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
