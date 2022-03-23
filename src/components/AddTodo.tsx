import * as React from 'react';
import { ApolloCache } from '@apollo/react-hooks';
import { FetchResult } from 'apollo-boost';

import { useTodoMutation } from '../useRequest';
import { ADD_TODO, GET_TODOS } from '../graphql';
import { ITodo, ITodoMutation, ITodos } from '../types/Todo';

const AddTodo: React.FC = () => {
  const [formData, setFormData] = React.useState<ITodo | {}>();
  const [addTodo] = useTodoMutation(ADD_TODO);

  const handleForm = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const handleSaveTodo = (
    e: React.FormEvent,
    { title, description }: ITodo | any
  ) => {
    e.preventDefault();
    addTodo({
      variables: { title, description },
      update: (
        cache: ApolloCache<ITodoMutation>,
        { data: addTodo }: FetchResult<ITodoMutation>
      ) => {
        const cacheData = cache.readQuery({ query: GET_TODOS }) as ITodos;
        cache.writeQuery({
          query: GET_TODOS,
          data: {
            getTodos: [...cacheData.getTodos, addTodo],
          },
        });
      },
    });
  };

  return (
    <form className="Form" onSubmit={(e) => handleSaveTodo(e, formData)}>
      <div>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Title
          </label>
          <input
            className="form-control"
            onChange={handleForm}
            type="text"
            id="title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            className="form-control"
            onChange={handleForm}
            type="text"
            id="description"
          />
        </div>
      </div>
      <button className="btn btn-success" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
