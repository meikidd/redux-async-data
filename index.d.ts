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

  export function createAsyncData<T>(data: T, enablePaging?: boolean): AsyncData<T>;
  export function createAsyncAction(type: string, status: Status, payload?: any): AnyAction;

  export function pending(type: string,payload?: any): AnyAction;
  export function succeeded(type: string,payload?: any): AnyAction;
  export function failed(type: string,payload?: any): AnyAction;
  export function noMore(type: string,payload?: any): AnyAction;

  export function createAsyncType(type: string, status: Status): string;

  export function updateAsyncData<T>(
    asyncData: AsyncData<T>,
    action: AnyAction,
    reducer?: Reducer
  ): AsyncData<T>

  export function parseAsyncType(type: string): { type: string; status: Status | null }

  export function isPending(asyncData: AsyncData<any>): boolean;
  export function isFailed(asyncData: AsyncData<any>): boolean;
  export function isSucceeded(asyncData: AsyncData<any>): boolean;

}