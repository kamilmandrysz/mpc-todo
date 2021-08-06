import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { cnb } from 'cnbuilder';

import Task from 'App/TodoList/components/Tasks/components/Task';
import EditTaskModal from 'App/TodoList/components/Tasks/components/EditTaskModal';

import styles from './Tasks.module.scss';

const Tasks = () => {
  const { tasks, doneTasksVisibility } = useSelector((state) => state.todoList);
  const [editModalVisibility, setEditModalVisibility] = useState(false);
  const [data, setData] = useState(null);

  const handleTaskClick = (taskData) => {
    setData(taskData);
    setEditModalVisibility(true);
  };

  return (
    <div className={cnb('w-100 d-flex flex-column py-3 position-relative', styles.Tasks)}>
      {tasks.length > 0 ? (
        tasks.map(({ id, task, is_completed }) => {
          if (!doneTasksVisibility && is_completed === 1) {
            return null;
          }

          return <Task key={id} id={id} task={task} is_completed={is_completed} handleTaskClick={handleTaskClick} />;
        })
      ) : (
        <p className="mx-auto">List is empty</p>
      )}

      <span className={styles.Tasks___line} />
      <span className={styles.Tasks___line} />
      <div className={styles.Tasks___bottom} />
      <div className={styles.Tasks___bottom} />

      {data && (
        <EditTaskModal
          visibility={editModalVisibility}
          setVisibility={setEditModalVisibility}
          data={data}
          setData={setData}
        />
      )}
    </div>
  );
};

export default Tasks;
