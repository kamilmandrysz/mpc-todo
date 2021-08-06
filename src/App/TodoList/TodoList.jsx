import React from 'react';
import { useSelector } from 'react-redux';
import { cnb } from 'cnbuilder';
import { Spinner } from 'react-bootstrap';

import TopBar from 'App/TodoList/components/TopBar';
import Tasks from 'App/TodoList/components/Tasks';

import styles from './TodoList.module.scss';

const TodoList = () => {
  const { isReady } = useSelector((state) => state.todoList);

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center px-3">
      {isReady ? (
        <div className={cnb('d-flex flex-column', styles.TodoList)}>
          <TopBar />
          <Tasks />
        </div>
      ) : (
        <Spinner animation="border" variant="light" />
      )}
    </div>
  );
};

export default TodoList;
