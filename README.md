# To Do List - Gerenciador de Tarefas

Este projeto é um gerenciador de tarefas desenvolvido em React, permitindo aos usuários adicionar, mover e excluir tarefas.

## Tecnologias Utilizadas

- Node.js;
- React.js;
- Vite (para um ambiente de desenvolvimento mais rápido);
- React Router DOM (para navegação entre páginas);
- Zustand (para gerenciamento de estado);
- UUID (para geração de IDs únicos);
- Tailwind CSS (para estilização);

## Estrutura do Projeto

```
 📂src/
    📂components/
        📂buttons/
            📄ButtonCompletes.jsx
            📄ButtonTasks.jsx
        📂input/
            📄Input.jsx
        📂state/
            📄store.js
        📂title/
            📄Title.jsx
        📄AddTasks.jsx
        📄Completes.jsx
        📄Tasks.jsx
    📂pages/
        📄TaskPage.jsx
    📄App.css
    📄App.jsx
    📄index.css
    📄main.jsx
```

## Como Instalar e Executar

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute o projeto:
   ```bash
   npm run dev
   ```

O projeto estará disponível em `http://localhost:5173/` (porta padrão do Vite).

## Estrutura do Código

### Componentes Principais
- O componente `App.jsx` renderiza a página principal, suas funções e outros componentes, como `AddTasks.jsx`, `Tasks.jsx` e `Completes.jsx`:

```bash
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
        <div className="flex flex-col md:flex-row justify-center p-5 gap-4 h-full container">
          <div className="w-full md:w-[400px] space-y-4">
            <AddTasks onAddTaskSubmit={onAddTaskSubmit} />
          </div>
          <div className="w-full md:w-[400px] space-y-4">
            <Tasks
              tasks={tasks}
              onTaskMoveClick={onTaskMoveClick}
              onDeleteClick={onDeleteClick}
            />
          </div>
          <div className="w-full md:w-[400px]">
            <Completes
              completedTasks={completedTasks}
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
```

- O componente `AddTasks.jsx` é responsável pela adição de novas tarefas:

```bash
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
```

- O componente `Tasks.jsx` é responsável pela exibição das tarefas pendentes:

```bash
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
```
- O componente `Completes.jsx` é responsável pela exibição das tarefas concluídas:

```bash
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
```

- O componente `TaskPage.jsx` é a pagina que exibe a tarefa e sua respectiva descrição:

```bash
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
```

### Componentes Estruturais

Esses componentes completam os pricipais para seu funcionamento, como: 
- `ButtonCompletes.jsx` e `ButtonCompletes.jsx`: Gerenciam o funcionamento dos botões.
- `Input.jsx`: Gerencia o funcionamento dos inputs.
- `store.js`: Proprio do Zustand, ele cria um hook que gerencia o estado global da aplicação. Ele define funções para adicionar, excluir e mover tarefas entre listas, garantindo que o estado seja atualizado corretamente.
- `Title.jsx`: Gerencia o funcionamento dos titúlos.

## Funcionalidades

- **Adicionar Tarefa**: O usuário pode adicionar uma nova tarefa informando um título e descrição.
- **Mover Tarefa para Concluídas**: O usuário pode mover uma tarefa para a lista de tarefas concluídas.
- **Mover Tarefa para Pendentes**: O usuário pode mover uma tarefa concluída de volta para a lista de tarefas pendentes.
- **Excluir Tarefa**: O usuário pode excluir tarefas tanto da lista de pendentes quanto da lista de concluídas.
- **Visualizar a Descrição**: O usuário pode visualizar a descrição da tarefa tanto da lista de pendentes quanto da lista de concluídas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça um push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

---
