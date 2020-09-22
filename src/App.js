import React, { useState } from 'react';

import { TodoList } from './components/TodoList';
import { CreateTodo } from './components/CreateTodo';

function App() {
  const [todos, pushTodo] = useState([]);
  const [show, setShow] = useState('all');

  const setTodos = (title) => {
    pushTodo([
      ...todos,
      {
        id: todos.length + 1,
        title,
        completed: false,
      },
    ]);
  };

  const handleCompleted = (event) => {
    pushTodo(todos.map(todo => (
      todo.id === +event.target.value
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : { ...todo }
    )));
  };

  const deleteTodo = (event) => {
    pushTodo(todos.filter(todo => todo.title !== event.target.value));
  };

  const editTodo = (id) => {
    pushTodo(todos.map(todo => (
      todo.id === id
        ? {
          ...todo,
          edit: true,
        }
        : { ...todo }
    )));
  };

  const handleTodoTitle = (event, id) => {
    pushTodo(todos.map(todo => (
      todo.id === id
        ? {
          ...todo,
          title: event.target.value,
        }
        : { ...todo }
    )));
  };

  const saveChangeTitle = (event, id, outside) => {
    (outside || event.key === 'Enter') && (event.target.value === ''
      ? deleteTodo(event)
      : pushTodo(todos.map(todo => (
        todo.id === id
          ? {
            id: todo.id,
            title: event.target.value,
            completed: todo.completed,
          }
          : { ...todo }
      ))));
  };

  const allCompleted = () => {
    if (todos.some(todo => !todo.completed)) {
      pushTodo(todos.map(todo => ({
        ...todo,
        completed: true,
      })));
    } else {
      pushTodo(todos.map(todo => ({
        ...todo,
        completed: false,
      })));
    }
  };

  const deleteCompletedTodos = () => {
    pushTodo(todos.filter(todo => !todo.completed));
  };

  const filterTodos = (event) => {
    setShow(event.target.value);
  };

  return (
    <section className="todoapp">
      <CreateTodo
        todos={todos}
        pushTodo={setTodos}
      />

      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              checked={todos.every(todo => todo.completed)}
              className="toggle-all"
              onChange={allCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          todos={todos}
          handleCompleted={handleCompleted}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          handleTodoTitle={handleTodoTitle}
          saveChangeTitle={saveChangeTitle}
          show={show}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            {todos.filter(todo => !todo.completed).length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <button
                className={show === 'all' ? 'selected' : ''}
                type="button"
                value="all"
                onClick={filterTodos}
              >
                All
              </button>
            </li>

            <li>
              <button
                className={show === 'active' ? 'selected' : ''}
                type="button"
                value="active"
                onClick={filterTodos}
              >
                Active
              </button>
            </li>

            <li>
              <button
                className={show === 'completed' ? 'selected' : ''}
                value="completed"
                type="button"
                onClick={filterTodos}
              >
                Completed
              </button>
            </li>
          </ul>

          {todos.some(todo => todo.completed) && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteCompletedTodos}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </section>
  );
}

export default App;
