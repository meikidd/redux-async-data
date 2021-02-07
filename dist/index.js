(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@babel/runtime/helpers/defineProperty", "./AsyncView"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@babel/runtime/helpers/defineProperty"), require("./AsyncView"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.defineProperty, global.AsyncView);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _defineProperty2, _AsyncView) {
  "use strict";

  var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    Status: true,
    createAsyncData: true,
    createAsyncType: true,
    createAsyncAction: true,
    pending: true,
    succeeded: true,
    failed: true,
    noMore: true,
    updateAsyncData: true,
    parseAsyncType: true,
    isInit: true,
    isPending: true,
    isFailed: true,
    isSucceeded: true,
    isFinished: true
  };
  _exports.createAsyncData = createAsyncData;
  _exports.createAsyncType = createAsyncType;
  _exports.createAsyncAction = createAsyncAction;
  _exports.pending = pending;
  _exports.succeeded = succeeded;
  _exports.failed = failed;
  _exports.noMore = noMore;
  _exports.updateAsyncData = updateAsyncData;
  _exports.parseAsyncType = parseAsyncType;
  _exports.isInit = isInit;
  _exports.isPending = isPending;
  _exports.isFailed = isFailed;
  _exports.isSucceeded = isSucceeded;
  _exports.isFinished = isFinished;
  _exports.Status = void 0;
  _defineProperty2 = _interopRequireDefault(_defineProperty2);
  Object.keys(_AsyncView).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
    if (key in _exports && _exports[key] === _AsyncView[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function get() {
        return _AsyncView[key];
      }
    });
  });

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  /*
  
  Status flow:
  
           INIT
            |
         PENDING
          /   \
  SUCCEEDED   FAILED
  
  */
  var Status;
  _exports.Status = Status;

  (function (Status) {
    Status["INIT"] = "INIT";
    Status["PENDING"] = "PENDING";
    Status["SUCCEEDED"] = "SUCCEEDED";
    Status["FAILED"] = "FAILED";
    Status["NO_MORE"] = "NO_MORE";
  })(Status || (_exports.Status = Status = {}));

  function createAsyncData(data, enablePaging) {
    return {
      status: Status.INIT,
      data: data,
      hasMore: enablePaging
    };
  }

  function createAsyncType(type, status) {
    return type + '.' + status;
  }

  function createAsyncAction(type, status, payload) {
    return {
      type: createAsyncType(type, status),
      payload: payload,
      isAsync: true
    };
  }

  function pending(type, payload) {
    return {
      type: createAsyncType(type, Status.PENDING),
      payload: payload,
      isAsync: true
    };
  }

  function succeeded(type, payload) {
    return {
      type: createAsyncType(type, Status.SUCCEEDED),
      payload: payload,
      isAsync: true
    };
  }

  function failed(type, payload) {
    return {
      type: createAsyncType(type, Status.FAILED),
      payload: payload,
      isAsync: true
    };
  }

  function noMore(type, payload) {
    return {
      type: createAsyncType(type, Status.NO_MORE),
      payload: payload,
      isAsync: true
    };
  }

  function updateAsyncData(asyncData, action, reducer) {
    var _parseAsyncType = parseAsyncType(action.type),
        status = _parseAsyncType.status;

    if (status === Status.FAILED) {
      return _objectSpread(_objectSpread({}, asyncData), {}, {
        status: Status.FAILED,
        error: action.payload
      });
    } else if (status === Status.NO_MORE) {
      return _objectSpread(_objectSpread({}, asyncData), {}, {
        hasMore: false
      });
    } else if (status === Status.PENDING) {
      return _objectSpread(_objectSpread({}, asyncData), {}, {
        status: Status.PENDING
      });
    } else if (status === Status.SUCCEEDED) {
      return _objectSpread(_objectSpread({}, asyncData), {}, {
        status: Status.SUCCEEDED,
        data: !!reducer ? reducer(asyncData.data, action) : action.payload
      });
    } else {
      return asyncData;
    }
  } // parseAsyncType('FETCH_TODO_LIST.PENDING') -> { type: 'FETCH_TODO_LIST', status: 'PENDING' }
  // parseAsyncType('SYNC_ACTION_TYPE') -> { type: 'SYNC_ACTION_TYPE', status: null }


  function parseAsyncType(type) {
    var matches = type.match(/^(\S+)\.(\w+$)/);

    if (matches && matches.length >= 3) {
      var status = null;

      if (Status.FAILED === matches[2]) {
        status = Status.FAILED;
      } else if (Status.INIT === matches[2]) {
        status = Status.INIT;
      } else if (Status.NO_MORE === matches[2]) {
        status = Status.NO_MORE;
      } else if (Status.PENDING === matches[2]) {
        status = Status.PENDING;
      } else if (Status.SUCCEEDED === matches[2]) {
        status = Status.SUCCEEDED;
      }

      return {
        type: matches[1],
        status: status
      };
    } else {
      return {
        type: type,
        status: null
      };
    }
  }

  function isInit(asyncData) {
    return asyncData.status === Status.INIT;
  }

  function isPending(asyncData) {
    return asyncData.status === Status.PENDING;
  }

  function isFailed(asyncData) {
    return asyncData.status === Status.FAILED;
  }

  function isSucceeded(asyncData) {
    return asyncData.status === Status.SUCCEEDED;
  }

  function isFinished(asyncData) {
    return isFailed(asyncData) || isSucceeded(asyncData);
  }
});