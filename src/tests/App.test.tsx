import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Todo App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
  });

  it('adds a new todo', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByLabelText('Add todo');

    await userEvent.type(input, 'New Todo');
    await userEvent.click(button);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('toggles todo completion', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByLabelText('Add todo');

    await userEvent.type(input, 'Toggle Todo');
    await userEvent.click(button);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('edits a todo', async () => {
    render(<App />);
    
    // Add a todo first
    await userEvent.type(screen.getByPlaceholderText('Add a new todo...'), 'Original Todo');
    await userEvent.click(screen.getByLabelText('Add todo'));

    // Edit the todo
    await userEvent.click(screen.getByLabelText('Edit'));
    const editInput = screen.getByDisplayValue('Original Todo');
    await userEvent.clear(editInput);
    await userEvent.type(editInput, 'Edited Todo');
    await userEvent.click(screen.getByLabelText('Save'));

    expect(screen.getByText('Edited Todo')).toBeInTheDocument();
  });

  it('deletes a todo', async () => {
    render(<App />);
    
    // Add a todo first
    await userEvent.type(screen.getByPlaceholderText('Add a new todo...'), 'Todo to delete');
    await userEvent.click(screen.getByLabelText('Add todo'));

    // Delete the todo
    await userEvent.click(screen.getByLabelText('Delete'));
    expect(screen.queryByText('Todo to delete')).not.toBeInTheDocument();
  });
});