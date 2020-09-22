import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  handleCompleted,
  deleteTodo,
  editTodo,
  handleTodoTitle,
  saveChangeTitle,
  show,
}) => (
  <ul className="todo-list">
    {todos.filter((todo) => {
      switch (show) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        default:
          return true;
      }
    })
      .map(todo => (
        <li
          key={todo.id}
          className={`${todo.edit && 'editing'}
          ${todo.completed && 'completed'}`}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              value={todo.id}
              onChange={handleCompleted}
              checked={todo.completed && true}
            />
            <label
              onDoubleClick={() => editTodo(todo.id)}
            >
              {todo.title}
            </label>
            <button
              value={todo.title}
              type="button"
              className="destroy"
              onClick={deleteTodo}
            />
          </div>
          <input
            type="text"
            className="edit"
            value={todo.title}
            onChange={event => handleTodoTitle(event, todo.id)}
            onKeyPress={event => saveChangeTitle(event, todo.id)}
            onBlur={event => saveChangeTitle(event, todo.id, true)}
          />
        </li>
      ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleCompleted: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  handleTodoTitle: PropTypes.func.isRequired,
  saveChangeTitle: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired,
};
