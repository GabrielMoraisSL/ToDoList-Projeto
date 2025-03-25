import { useState } from "react";
import Input from "./Input";

function AddTasks({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <h2 className="text-xl text-blue-950 font-bold text-center">
        Adicionar Tarefas
      </h2>
      <Input type="text"
        placeholder="Digite o nome da Tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input type="text"
        placeholder="Digite a descrição da Tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        className="bg-blue-950 w-full text-white px-4 py-2 rounded-md font-medium"
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("Preencha o nome e a descrição da tarefa.");
          }
          onAddTaskSubmit(title, description);
          setTitle("");
          setDescription("");
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTasks;
