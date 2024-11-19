import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { ListTodo } from 'lucide-react';

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container max-w-2xl px-4 py-8 mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ListTodo className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          </div>
          <p className="text-gray-600">Stay organized and productive</p>
        </header>

        <main>
          <TodoForm onSubmit={addTodo} />
          
          <div className="space-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500">No todos yet. Add one above!</p>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;