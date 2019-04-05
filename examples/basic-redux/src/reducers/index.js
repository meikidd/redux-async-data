import { combineReducers } from 'redux';
import {
  SELECT_REDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  FAILED_POSTS
} from '../actions';

function selectedReddit(state = 'notfound', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit;
    default:
      return state;
  }
}

function posts(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return { ...state, isFetching: true };

    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    case FAILED_POSTS:
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.error
      };
    default:
      return state;
  }
}

function postsByReddit(state = {}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
    case FAILED_POSTS:
      return {
        ...state,
        [action.reddit]: posts(state[action.reddit], action)
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
