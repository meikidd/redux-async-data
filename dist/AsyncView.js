import * as React from 'react';
import { isInit, isPending, isSucceeded, isFailed } from './index';
var isEmptyArray = function (data) {
    return data.length === 0;
};
var isEmptyObject = function (data) {
    return Object.keys(data).length === 0;
};
export function AsyncView(props) {
    var data = props.data, init = props.init, pending = props.pending, failed = props.failed, empty = props.empty, succeeded = props.succeeded, checkEmpty = props.checkEmpty;
    var result = data.data;
    var isEmpty = !result ||
        isEmptyArray(result) ||
        isEmptyObject(result) ||
        (!!checkEmpty && checkEmpty(result));
    var content = succeeded;
    if (isInit(data) && !!init) {
        content = init;
    }
    else if (isPending(data) && !!pending) {
        content = pending;
    }
    else if (isFailed(data) && !!failed) {
        content = failed;
    }
    else if (isSucceeded(data) && isEmpty && !!empty) {
        content = empty;
    }
    return React.createElement(React.Fragment, null, content);
}
