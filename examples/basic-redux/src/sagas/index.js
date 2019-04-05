import { take, put, call, fork, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions';
import {
  selectedRedditSelector,
  postsByRedditSelector
} from '../reducers/selectors';

export function fetchPostsApi(reddit) {
  return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => {
      if (response.status === 200) {
        return response;
      } else {
        return Promise.reject(new Error('Request failed', response));
      }
    })
    .then(response => response.json());
}

export function* fetchPosts(reddit) {
  try {
    if (reddit !== 'empty') {
      yield put(actions.requestPosts(reddit));
      const res = yield call(fetchPostsApi, reddit);
      const posts = res.data.children.map(child => child.data);
      yield put(actions.receivePosts(reddit, posts));
    } else {
      yield put(actions.receivePosts(reddit, []));
    }
  } catch (e) {
    yield put(actions.failedPosts(reddit, e));
  }
}

export function* invalidateReddit() {
  while (true) {
    const { reddit } = yield take(actions.INVALIDATE_REDDIT);
    yield call(fetchPosts, reddit);
  }
}

export function* nextRedditChange() {
  while (true) {
    const prevReddit = yield select(selectedRedditSelector);
    yield take(actions.SELECT_REDDIT);

    const newReddit = yield select(selectedRedditSelector);
    const postsByReddit = yield select(postsByRedditSelector);
    if (prevReddit !== newReddit && !postsByReddit[newReddit])
      yield fork(fetchPosts, newReddit);
  }
}

export function* startup() {
  const selectedReddit = yield select(selectedRedditSelector);
  yield fork(fetchPosts, selectedReddit);
}

export default function* root() {
  yield fork(startup);
  yield fork(nextRedditChange);
  yield fork(invalidateReddit);
}
