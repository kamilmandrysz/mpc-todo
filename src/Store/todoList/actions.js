import API from 'Lib/axios';

import { TASKS_ENDPOINTS } from 'Constants/endpoints';

import * as actionTypes from 'Store/todoList/actionTypes';

/** IS READY ########################################################################################################### IS READY */

export const setIsReadyAction = (isReady) => ({
  type: actionTypes.SET_IS_READY,
  payload: {
    isReady,
  },
});

/** TASKS ########################################################################################################### TASKS */

export const setTasksAction = (tasks) => ({
  type: actionTypes.SET_TASKS,
  payload: {
    tasks,
  },
});

export const getTasks = (init = false) => {
  return (dispatch) => {
    API.get(TASKS_ENDPOINTS.TASKS)
      .then((res) => {
        const { data } = res.data;

        dispatch(setTasksAction(data));

        if (init) {
          dispatch(setIsReadyAction(true));
        }
      })
      .catch((err) => {
        const { status } = err.response;

        if (status === 404) {
          dispatch(setTasksAction([]));

          if (init) {
            dispatch(setIsReadyAction(true));
          }
        }
      });
  };
};

/** DONE TASKS VISIBILITY ########################################################################################################### DONE TASKS VISIBILITY */

export const setDoneTasksVisibilityAction = (visibility) => ({
  type: actionTypes.SET_DONE_TASKS_VISIBILITY,
  payload: {
    visibility,
  },
});

export const changeDoneTasksVisibility = () => {
  return (dispatch, getState) => {
    const { doneTasksVisibility } = getState().todoList;

    dispatch(setDoneTasksVisibilityAction(!doneTasksVisibility));
  };
};
