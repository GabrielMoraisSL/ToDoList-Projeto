import { NotebookTextIcon, TrashIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./buttons/ButtonTasks";

function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();
    query.set("title", task.title);
    query.set("description", task.description);
    navigate(`/task?${query.toString()}`);
  }
  return (
    <div>
        <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
          <h2 className="text-xl text-blue-950 font-bold justify-center flex gap-1">
            A fazer
            <div className="mt-1">
              <ClockIcon />
            </div>
          </h2>
          {props.tasks.map((task) => (
            <li key={task.id} className="flex gap-2">
              <button
                className={`bg-blue-700 w-full text-left text-white p-2 rounded-md ${
                  task.isCompleted && "line-through"
                }`}
                onClick={() => props.onTaskMoveClick(task.id)}
              >
                {task.title}
              </button>
              <Button onClick={() => onSeeDetailsClick(task)}>
                <NotebookTextIcon />
              </Button>
              <Button onClick={() => props.onDeleteClick(task.id)}>
                <TrashIcon />
              </Button>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default Tasks;
