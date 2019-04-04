import * as React from 'react';
import { isInit, isPending, isSucceeded, isFailed } from './index';
export function AsyncView(props) {
    var data = props.data, init = props.init, pending = props.pending, failed = props.failed, empty = props.empty, succeeded = props.succeeded;
    var result = data.data;
    var isEmpty = !result || result.length === 0 || !Object.keys(result).length;
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
