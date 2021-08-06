import update from 'immutability-helper';

import * as actionTypes from 'Store/todoList/actionTypes';

const initialState = {
  tasks: [],
  doneTasksVisibility: true,
  isReady: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TASKS: {
      const { tasks } = action.payload;

      return update(state, {
        tasks: {
          $set: tasks,
        },
      });
    }
    case actionTypes.SET_IS_READY: {
      const { isReady } = action.payload;

      return update(state, {
        isReady: {
          $set: isReady,
        },
      });
    }
    case actionTypes.SET_DONE_TASKS_VISIBILITY: {
      const { visibility } = action.payload;

      return update(state, {
        doneTasksVisibility: {
          $set: visibility,
        },
      });
    }
    default:
      return state;
  }
};
