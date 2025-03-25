import Tasks from "./components/Tasks";
import AddTasks from "./components/AddTasks";
import Title from "./components/Title";
import Completes from "./components/Completes";
import useStore from "./components/store";
import { v4 } from "uuid";

function App() {
  const {
    tasks,
    completedTasks,
    addTask,
    deleteTask,
    moveTaskToCompleted,
    moveTaskToPending,
  } = useStore();

  function onDeleteClick(taskId, fromCompleted = false) {
    deleteTask(taskId, fromCompleted);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };
    addTask(newTask);
  }

  function onTaskMoveClick(taskId) {
    moveTaskToCompleted(taskId);
  }

  function onCompletedTaskClick(taskId) {
    moveTaskToPending(taskId);
  }

  return (
    <div className="w-screen h-screen bg-blue-500 flex flex-col items-center p-6 overflow-auto">
      <div>
        <Title>Gerenciador de Tarefas</Title>
        <div className="flex flex-col sm:flex-row justify-center p-5 gap-4 h-full ">
          <div className="w-full md:w-[400px] space-y-4">
            <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
            <Tasks
              tasks={tasks}
              onTaskMoveClick={onTaskMoveClick}
              onDeleteClick={onDeleteClick}
            />
          </div>
          <div className="w-full md:w-[400px]">
            <Completes
              Completedtasks={completedTasks}
              onCompletedTaskClick={onCompletedTaskClick}
              onDeleteClick={onDeleteClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
