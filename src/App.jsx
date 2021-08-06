import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getTasks } from 'Store/todoList/actions';

import TodoList from 'App/TodoList';
import Toastr from 'Components/Toastr';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(true));
  }, [dispatch]);

  return (
    <>
      <TodoList />
      <Toastr />
    </>
  );
};

export default App;
