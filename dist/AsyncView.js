(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "./index"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("./index"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.index);
    global.AsyncView = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, React, _index) {
  "use strict";

  var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.AsyncView = AsyncView;
  React = _interopRequireWildcard(React);

  var isEmptyArray = function isEmptyArray(data) {
    return data.length === 0;
  };

  var isEmptyObject = function isEmptyObject(data) {
    return Object.keys(data).length === 0;
  };

  function AsyncView(props) {
    var data = props.data,
        init = props.init,
        pending = props.pending,
        failed = props.failed,
        empty = props.empty,
        succeeded = props.succeeded,
        checkEmpty = props.checkEmpty;
    var result = data.data;
    var isEmpty = !result || isEmptyArray(result) || isEmptyObject(result) || !!checkEmpty && checkEmpty(result);
    var content = succeeded;

    if ((0, _index.isInit)(data) && !!init) {
      content = init;
    } else if ((0, _index.isPending)(data) && !!pending) {
      content = pending;
    } else if ((0, _index.isFailed)(data) && !!failed) {
      content = failed;
    } else if ((0, _index.isSucceeded)(data) && isEmpty && !!empty) {
      content = empty;
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, content);
  }
});