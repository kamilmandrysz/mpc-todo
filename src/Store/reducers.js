import { combineReducers } from 'redux';

import { reducer as toastr } from 'react-redux-toastr';
import { reducer as todoList } from 'Store/todoList/reducer';

export const rootReducer = combineReducers({ todoList, toastr });
