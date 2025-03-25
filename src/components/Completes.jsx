import { CheckIcon, NotebookTextIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./ButtonCompletes";

function Completes(props) {
  const navigate = useNavigate();

  function onSeeDetailsClick(CompletedTasks) {
    const query = new URLSearchParams();
    query.set("title", CompletedTasks.title);
    query.set("description", CompletedTasks.description);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <div>
      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        <h2 className="text-xl text-blue-950 font-bold justify-center flex gap-1">
          Feita
          <div className="mt-1">
            <CheckIcon />
          </div>
        </h2>
        {props.completedTasks.map((task) => (
          <li key={task.id} className="flex gap-2">
            <button
              className={`bg-blue-300 w-full text-left text-white p-2 rounded-md flex ${
                task.isCompleted && "line-through"
              }`}
              onClick={() => props.onCompletedTaskClick(task.id)}
            >
              {task.isCompleted && <CheckIcon />}
              {task.title}
            </button>

            <Button onClick={() => onSeeDetailsClick(task)}>
              <NotebookTextIcon />
            </Button>
            <Button onClick={() => props.onDeleteClick(task.id, true)}>
              <TrashIcon />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Completes;
