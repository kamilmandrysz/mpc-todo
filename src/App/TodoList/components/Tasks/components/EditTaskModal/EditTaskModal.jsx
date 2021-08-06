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

const EditTaskModal = ({ visibility, setVisibility, data, setData }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingDelete, setIsSubmittingDelete] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { task: data?.task },
  });

  const onSubmit = (sendData) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.keys(sendData).forEach((key) => {
      formData.append(key, sendData[key]);
    });

    formData.append('is_completed', data.is_completed);

    API.post(`${TASKS_ENDPOINTS.TASKS}/${data.id}`, formData)
      .then(() => {
        dispatch(getTasks());
        toastr.success('Success', 'Task updated successfully');
        setData(null);
        setVisibility(false);
        setIsSubmitting(false);
      })
      .catch(() => {
        toastr.error('Error', 'Something went wrong');
        setIsSubmitting(false);
      });
  };

  const handleDeleteClick = () => {
    setIsSubmittingDelete(true);

    API.delete(`${TASKS_ENDPOINTS.TASKS}/${data.id}`)
      .then(() => {
        dispatch(getTasks());
        toastr.success('Success', 'Task deleted successfully');
        setData(null);
        setVisibility(false);
        setIsSubmittingDelete(false);
      })
      .catch(() => {
        toastr.error('Error', 'Something went wrong');
      });
  };

  return (
    <Modal
      show={visibility}
      onHide={() => {
        setVisibility(false);
        setData(null);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            className="w-100 mb-2"
            innerRef={register}
            name="task"
            placeholder="Task"
            feedback={errors.task?.message}
            isError={!!errors.task}
          />
          <div className="d-flex justify-content-center">
            <Button
              className="m-2"
              type="submit"
              label="Submit"
              isDisabled={isSubmitting || isSubmittingDelete || !isEmptyObject(errors)}
              isSubmitting={isSubmitting}
            />

            <Button
              className="m-2"
              type="button"
              label="Delete"
              buttonType="secondary"
              onClick={handleDeleteClick}
              isDisabled={isSubmittingDelete || isSubmitting}
              isSubmitting={isSubmittingDelete}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

EditTaskModal.propTypes = {
  visibility: PropTypes.bool.isRequired,
  setVisibility: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    is_completed: PropTypes.number.isRequired,
  }).isRequired,
  setData: PropTypes.func.isRequired,
};

export default EditTaskModal;
