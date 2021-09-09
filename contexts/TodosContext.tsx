import React, { createContext, useState } from 'react';
import { Todo } from '../pages/api/interface/Todo';

interface ITodoContext {
  todos: Todo[];
}

const TodosContext = createContext<any>([]);

const TodosProvider = ({ children }: any) => {
  const [todos, setTodos] = useState<any[]>([]);

  const refreshTodos = async (id: string) => {
    if (id) {
      try {
        const res = await fetch('/api/getTodos', {
          method: 'GET',
          credentials: 'include',
        });
        const latestTodos = await res.json();
        setTodos(latestTodos);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addTodo = async (description: string, deadline: Date) => {
    try {
      const res = await fetch('/api/createTodo', {
        method: 'POST',
        body: JSON.stringify({ description, deadline }),
        headers: { 'Content-Type': 'application/json' },
      });
      const newTodo = await res.json();

      setTodos((prevTodos): any => {
        return [newTodo, ...prevTodos];
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (updatedTodo: any) => {
    try {
      const res = await fetch('/api/updateTodo', {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: { 'Content-Type': 'application/json' },
      });
      await res.json();
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find((todo: any) => todo.id === updatedTodo.id);
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id: any) => {
    try {
      const res = await fetch('/api/deleteTodo', {
        method: 'Delete',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
      await res.json();
      setTodos((prevTodos): any => {
        return prevTodos?.filter((todo: any) => todo.id !== id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
