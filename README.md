# Redux Async Data

This is a library to simplify your asynchronous data status management.

## Why do I need this?

With the help of redux-saga (and redux-thunk), we can do async logic easily in redux. But it is still a bit trouble when we want to maintain status of the async data. Specially when there are tons of async entities in our app, we will soon get our actions and reducers like this:

```javascript
// in actions.js
export const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED';
export const FETCH_USER_SUCCEEDED = 'FETCH_USER_SUCCEEDED';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const FETCH_ARTICLES_REQUESTED = 'FETCH_ARTICLES_REQUESTED';
export const FETCH_ARTICLES_SUCCEEDED = 'FETCH_ARTICLES_SUCCEEDED';
export const FETCH_ARTICLES_FAILED = 'FETCH_ARTICLES_FAILED';

// in reducer/user.js
switch (type) {
  case FETCH_USER_REQUESTED:
    return { isFetching: true };
  case FETCH_USER_SUCCEEDED:
    return {
      isFetching: false,
      user: action.payload
    };
  case FETCH_USER_FAILED:
    return {
      isFetching: false,
      error: action.payload
    };
  default:
    return state;
}

// in reducer/article.js
switch (type) {
  case FETCH_ARTICLES_REQUESTED:
    return { isFetching: true };
  case FETCH_ARTICLES_SUCCEEDED:
    return {
      isFetching: false,
      articles: action.payload
    };
  case FETCH_ARTICLES_FAILED:
    return {
      isFetching: false,
      error: action.payload
    };
  default:
    return state;
}
```

**This library can help you to get rid of these repetitive things.**

## Get Started

### Install

```
npm install --save redux-async-data
```

or

```
yarn add redux-async-data
```

### Usage

To create a AsyncData object in global state, you can use `createAsyncData()` function:

```js
import { createAsyncData } from 'redux-async-data';

createAsyncData([]);
```

It will create an async data structure:

```js
{
  status: "INIT",
  data: [],
  error: null
}
```

Supported status: INIT, PENDING, SUCCEEDED, FAILED

#### Status Flow

```
         INIT
          |
       PENDING
      /       \
  SUCCEEDED  FAILED
```

Use `createAsyncAction(actionType, status)` to create async actions:

```js
import { createAsyncAction, Status } from 'redux-async-data';
dispatch(createAsyncAction('FETCH_USER', Status.PENDING));
dispatch(createAsyncAction('FETCH_USER', Status.SUCCEEDED));
dispatch(createAsyncAction('FETCH_USER', Status.FAILED));
```

and can also use `pending(actionType)`, `succeeded(actionType)`, `failed(actionType)` for short:

```js
import { pending, succeeded, failed } from 'redux-async-data';

dispatch(pending('FETCH_USER'));
dispatch(succeeded('FETCH_USER'));
dispatch(failed('FETCH_USER'));
```

Async actions type are end with status: `FETCH_USER.PENDING`, `FETCH_USER.SUCCEEDED`, `FETCH_USER.FAILED`

In reducers, `updateAsyncData()` will handle data status automatically for you,

```js
// reducers.js
import { updateAsyncData, parseAsyncType } from 'redux-async-data';

function reducers(state = createAsyncData({}), action) {
  const { type } = parseAsyncType(action.type);

  switch (type) {
    case 'FETCH_USER':
      return {
        ...state,
        user: updateAsyncData(state.user, action)
      };
    default:
      return state;
  }
}
```

What `updateAsyncData()` does are:

1. parse `action.type` and get the status
1. update `state.user.status`
1. when status is `SUCCEEDED`, then update `state.user.data` with `action.payload`
1. when status is `FAILED`, then update `state.user.error` with `action.payload`

You can also pass a custom function to set `state.user.data` for more complex cases:

```js
// In this example, we assume action.payload is a list of users
// The first parameter "data", refers to the old data (state.user.data)
function getUser(data, action) {
  const oldUser = data;
  const newUser = action.payload.find(user => user.id === oldUser.id);
  return newUser || oldUser;
}

updateAsyncData(state.user, action, getUser);
```

#### AsyncView

In additional, we provide a React component `AsyncView` which can show content correspond with the status.

```jsx
<AsyncView
  data={this.props.users}
  pending={<div>Loading...</div>}
  failed={<div>Oops, something wrong.</div>}
  empty={<div>It's empty here</div>}
  succeeded={<div>Users: {users.map(user => user.name).join()}</div>}
>
```

### Example in compare with pure redux

#### Without using redux-async-data

Suppose we have a UI to fetch user data from a remote server when a button is clicked.

Our user model should be something looks like this:

```typescript
interface User {
  isPending: boolean;
  data: {
    id: number;
    name: string;
  };
  error: string;
}
```

And we need three actions:

```js
export const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED';
export const FETCH_USER_SUCCEEDED = 'FETCH_USER_SUCCEEDED';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';
```

To be more user friendly, we need to show user the request pending status, recieved data, and response errors.

```jsx
class UserComponent extends React.Component {
  ...
  onSomeButtonClicked() {
    const { dispatch } = this.props
    dispatch({ type: Actions.FETCH_USER_REQUESTED})
  }
  render() {
    const {isFetching, data, error} = this.props.user;
    return <div>
      {isFetching && <div>Loading...</div>}
      {!isFetching && error && <div>Oops, something wrong.</div>}
      {!isFetching && !error && !data.id && <div>User is not exist</div>}
      {!isFetching && !error && data.id && <div key={data.id}>Hi, I am {data.name}</div>}
    </div>
  }
  ...
}
```

It's easy to get confused by the following code:

```
{isFetching && <div>Loading...</div>}
{!isFetching && error && <div>Oops, something wrong.</div>}
{!isFetching && !error && !data.id && <div>User is not exist</div>}
{!isFetching && !error && data.id && <div key={data.id}>Hi, I am {data.name}</div>}
```

Reducers will be like:

```js
switch (type) {
  case FETCH_USER_REQUESTED:
    return { isPending: true };
  case FETCH_USER_SUCCEEDED:
    return {
      isPending: false,
      data: action.payload
    };
  case FETCH_USER_FAILED:
    return {
      isPending: false,
      error: action.payload
    };
  default:
    return state;
}
```

#### Using redux-async-data

User model

```typescript
interface User extends AsyncData
```

Actions:

```js
export const FETCH_USER = 'FETCH_USER';
```

In component:

```jsx
import { pending } from 'redux-async-data';

class UserComponent extends React.Component {
  ...
  onSomeButtonClicked() {
    const { dispatch } = this.props
    dispatch(pending(Actions.FETCH_USER))
  }
  render() {
    const {isFetching, data, error} = this.props.user;
    return <AsyncView
      data={this.props.user}
      pending={<div>Loading...</div>}
      failed={<div>Oops, something wrong.</div>}
      empty={<div>User is not exist</div>}
      succeeded={<div key={data.id}>Hi, I am {data.name}</div>}
    >
  }
  ...
}
```

Reducers:

```js
switch (type) {
  case FETCH_USER:
    return updateAsyncData(state, action);
  default:
    return state;
}
```
