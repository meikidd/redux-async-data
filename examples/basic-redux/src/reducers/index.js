import { combineReducers } from 'redux';
import {
  SELECT_REDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  FAILED_POSTS
} from '../actions';

function selectedReddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.payload.reddit;
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
        items: action.payload.posts,
        lastUpdated: action.payload.receivedAt
      };
    case FAILED_POSTS:
      return {
        ...state,
        isFetching: false,
        items: [],
        error: action.payload.error
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
        [action.payload.reddit]: posts(state[action.payload.reddit], action)
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
