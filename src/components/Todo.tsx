import * as React from 'react';
import { ITodo } from '../types/Todo';

type Props = {
  todo: ITodo;
};

const Todo: React.FC<Props> = ({ todo }) => {
  const { title, description } = todo;

  return (
    <div className="col-sm-6">
      <div className="card mt-2">
        <div className="card-body">
          <h1 className="card-title">{title}</h1>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
