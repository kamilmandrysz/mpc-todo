import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toastr } from 'react-redux-toastr';

import API from 'Lib/axios';

import { isEmptyObject } from 'Utils/common';

import { TASKS_ENDPOINTS } from 'Constants/endpoints';

import { getTasks } from 'Store/todoList/actions';

import Input from 'Components/Input';
import Button from 'Components/Button';

const schema = yup.object().shape({
  task: yup.string().required('This field is required'),
});

const AddTaskModal = ({ visibility, setVisibility }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    formData.append('is_completed', '0');

    API.post(`${TASKS_ENDPOINTS.TASKS}/`, formData)
      .then(() => {
        dispatch(getTasks());
        toastr.success('Success', 'Task added successfully');
        setVisibility(false);
        setIsSubmitting(false);
      })
      .catch(() => {
        toastr.error('Error', 'Something went wrong');
        setIsSubmitting(false);
      });
  };

  return (
    <Modal show={visibility} onHide={() => setVisibility(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            className="w-100 mb-3"
            innerRef={register}
            name="task"
            placeholder="Task"
            feedback={errors.task?.message}
            isError={!!errors.task}
          />
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              label="Submit"
              isDisabled={isSubmitting || !isEmptyObject(errors)}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

AddTaskModal.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
};

export default AddTaskModal;
