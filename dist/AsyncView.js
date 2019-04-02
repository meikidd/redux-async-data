import * as React from 'react';
import { isPending, isSucceeded, isFailed } from './index';
export function AsyncView(props) {
    var data = props.data, pending = props.pending, failed = props.failed, empty = props.empty, succeeded = props.succeeded;
    var result = data.data;
    var isEmpty = !result || !result.length || !Object.keys(result).length;
    var content = succeeded;
    if (isPending(data) && !!pending) {
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
