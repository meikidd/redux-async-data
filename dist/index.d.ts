import { AnyAction, Reducer } from 'redux';
export declare enum Status {
    INIT = "INIT",
    PENDING = "PENDING",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
    NO_MORE = "NO_MORE"
}
export declare type AsyncData<T> = {
    status: Status;
    data: T;
    error?: string;
    hasMore?: boolean;
};
export declare function createAsyncData<T>(data: T, enablePaging?: boolean): AsyncData<T>;
export declare function createAsyncType(type: string, status: Status): string;
export declare function createAsyncAction(type: string, status: Status, payload?: any): AnyAction;
export declare function pending(type: string, payload?: any): AnyAction;
export declare function succeeded(type: string, payload?: any): AnyAction;
export declare function failed(type: string, payload?: any): AnyAction;
export declare function noMore(type: string, payload?: any): AnyAction;
export declare function updateAsyncData(asyncData: AsyncData<any>, action: AnyAction, reducer?: Reducer): AsyncData<any> | {
    status: Status;
    error: any;
    data: any;
    hasMore?: boolean | undefined;
};
export declare function parseAsyncType(type: string): {
    type: string;
    status: Status | null;
};
export declare function isInit(asyncData: AsyncData<any>): boolean;
export declare function isPending(asyncData: AsyncData<any>): boolean;
export declare function isFailed(asyncData: AsyncData<any>): boolean;
export declare function isSucceeded(asyncData: AsyncData<any>): boolean;
export declare function isFinished(asyncData: AsyncData<any>): boolean;
export * from './AsyncView';
