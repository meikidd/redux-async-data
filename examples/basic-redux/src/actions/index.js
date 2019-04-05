export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const FAILED_POSTS = 'FAILED_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    payload: {
      reddit
    }
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    payload: {
      reddit
    }
  };
}

export function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    payload: {
      reddit
    }
  };
}

export function receivePosts(reddit, posts) {
  return {
    type: RECEIVE_POSTS,
    payload: {
      reddit,
      posts,
      receivedAt: new Date().setMilliseconds(0)
    }
  };
}

export function failedPosts(reddit, error) {
  return {
    type: FAILED_POSTS,
    payload: {
      reddit,
      error
    }
  };
}
