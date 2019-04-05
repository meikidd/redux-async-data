import {
  updateAsyncData,
  createAsyncData,
  parseAsyncType
} from 'redux-async-data';

import { combineReducers } from 'redux';
import { SELECT_REDDIT, REQUEST_POSTS } from '../actions';

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.payload.reddit;
    default:
      return state;
  }
}

function postsByReddit(state = {}, action) {
  const { type } = parseAsyncType(action.type);

  switch (type) {
    case REQUEST_POSTS:
      if (!state[action.payload.reddit]) {
        state[action.payload.reddit] = createAsyncData([]);
      }
      return {
        ...state,
        [action.payload.reddit]: updateAsyncData(
          state[action.payload.reddit],
          action,
          (data, action) => {
            return action.payload.posts;
          }
        )
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit
});

export default rootReducer;
