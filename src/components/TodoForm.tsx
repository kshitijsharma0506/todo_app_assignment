import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TodoError } from '../types/todo';

interface TodoFormProps {
  onSubmit: (title: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState<TodoError>({});

  const validate = (): boolean => {
    const newErrors: TodoError = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(title);
      setTitle('');
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo..."
            className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-blue-500"
            aria-label="New todo title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500" role="alert">{errors.title}</p>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Add todo"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}