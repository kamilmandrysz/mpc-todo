import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { cnb } from 'cnbuilder';
import { toastr } from 'react-redux-toastr';
import { CSSTransition } from 'react-transition-group';

import API from 'Lib/axios';

import { TASKS_ENDPOINTS } from 'Constants/endpoints';

import { getTasks } from 'Store/todoList/actions';

import Checkbox from 'Components/Checkbox';

import styles from './Task.module.scss';

const Task = ({ id, task, is_completed, handleTaskClick }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(is_completed === 1);

  const handleCheckboxClick = () => {
    const formData = new FormData();

    formData.append('task', task);
    formData.append('is_completed', !checked ? '1' : '0');

    API.post(`${TASKS_ENDPOINTS.TASKS}/${id}`, formData)
      .then(() => {
        setChecked(!checked);
        dispatch(getTasks());
        toastr.success('Success', 'Task status updated successfully');
      })
      .catch(() => {
        toastr.success('Error', 'Something went wrong');
      });
  };

  return (
    <CSSTransition in timeout={300} appear classNames="animation">
      <div className={cnb(styles.Task, 'd-flex align-items-center px-3')}>
        <div className={cnb(styles.Task__checkbox, 'py-3 px-2')}>
          <Checkbox name={id} defaultChecked={checked} onClick={handleCheckboxClick} />
        </div>
        <button
          className={cnb(styles.Task__label__wrapper, 'button')}
          type="button"
          onClick={() => handleTaskClick({ id, task, is_completed })}
        >
          <span className={cnb(checked && styles.Task__label__done, 'ellipsis')}>{task}</span>
        </button>
      </div>
    </CSSTransition>
  );
};

Task.propTypes = {
  id: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  is_completed: PropTypes.number.isRequired,
  handleTaskClick: PropTypes.func.isRequired,
};

export default Task;
