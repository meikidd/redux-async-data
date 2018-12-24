/*

Status flow:

         INIT
          |
       PENDING
        /   \
SUCCEEDED   FAILED

*/
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var Status;
(function (Status) {
    Status["INIT"] = "INIT";
    Status["PENDING"] = "PENDING";
    Status["SUCCEEDED"] = "SUCCEEDED";
    Status["FAILED"] = "FAILED";
    Status["NO_MORE"] = "NO_MORE";
})(Status || (Status = {}));
export function createAsyncData(data, enablePaging) {
    return {
        status: Status.INIT,
        data: data,
        hasMore: enablePaging
    };
}
export function createAsyncAction(type, status, payload) {
    return { type: createAsyncType(type, status), payload: payload, isAsync: true };
}
export function createAsyncType(type, status) {
    return type + '.' + status;
}
export function updateAsyncData(asyncData, action, reducer) {
    var status = parseAsyncType(action.type).status;
    if (status === Status.FAILED) {
        return __assign({}, asyncData, { status: Status.FAILED, errorMsg: action.payload });
    }
    else if (status === Status.NO_MORE) {
        return __assign({}, asyncData, { hasMore: false });
    }
    else if (status === Status.PENDING) {
        return __assign({}, asyncData, { status: Status.PENDING });
    }
    else if (status === Status.SUCCEEDED) {
        return __assign({}, asyncData, { status: Status.SUCCEEDED, data: !!reducer ? reducer(asyncData.data, action) : action.payload });
    }
    else {
        return asyncData;
    }
}
// parseAsyncType('FETCH_TODO_LIST.PENDING') -> { type: 'FETCH_TODO_LIST', status: 'PENDING' }
// parseAsyncType('SYNC_ACTION_TYPE') -> { type: 'SYNC_ACTION_TYPE', status: null }
export function parseAsyncType(type) {
    var matches = type.match(/^(\S+)\.(\w+$)/);
    if (matches && matches.length >= 3) {
        var status_1 = null;
        if (Status.FAILED === matches[2]) {
            status_1 = Status.FAILED;
        }
        else if (Status.INIT === matches[2]) {
            status_1 = Status.INIT;
        }
        else if (Status.NO_MORE === matches[2]) {
            status_1 = Status.NO_MORE;
        }
        else if (Status.PENDING === matches[2]) {
            status_1 = Status.PENDING;
        }
        else if (Status.SUCCEEDED === matches[2]) {
            status_1 = Status.SUCCEEDED;
        }
        return { type: matches[1], status: status_1 };
    }
    else {
        return { type: type, status: null };
    }
}
export function isPending(asyncData) {
    return asyncData.status === Status.PENDING;
}
//# sourceMappingURL=index.js.map