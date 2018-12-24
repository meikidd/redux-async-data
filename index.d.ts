import { AnyAction, Reducer } from "redux";

declare module 'redux-async-data' {
  export enum Status {
    INIT = 'INIT',
    PENDING = 'PENDING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED',
    NO_MORE = 'NO_MORE'
  }
  export type AsyncData<T> = {
    status: Status;
    data: T;
    errorMsg?: string;
    hasMore?: boolean; // hasMore is used for pagination 
  };

  interface ReduxAsyncData {

    createAsyncData<T>(
      data: T,
      enablePaging?: boolean
    ): AsyncData<T>;
  
    
    createAsyncAction(
      type: string,
      status: Status,
      payload?: any
    ): AnyAction;
  
    createAsyncType(type: string, status: Status): string;
  
    updateAsyncData<T>(
      asyncData: AsyncData<T>,
      action: AnyAction,
      reducer?: Reducer
    ): AsyncData<T>
  
    parseAsyncType(
      type: string
    ): { type: string; status: Status | null }
  
    isPending(asyncData: AsyncData<any>): boolean;
  }

  let reduxAsyncData: ReduxAsyncData;

  export default reduxAsyncData;
}