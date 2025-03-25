import { useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-blue-500 justify-center p-6 space-y-4">
      <div className="flex justify-center relative">
        <button
          className="absolute left-0 top-0 bottom-0 text-white mr-50 sm:mr-0"
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon />
        </button>
        <Title>Detalhes da Tarefa</Title>
      </div>

      <div className="p-6 bg-slate-200 rounded-md shadow">
        <h2 className="text-xl text-blue-950 font-bold">{title}</h2>
        <p className="text-blue-950">{description}</p>
      </div>
    </div>
  );
}

export default TaskPage;
