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

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.AsyncView = AsyncView;
  React = _interopRequireWildcard(React);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  const isEmptyArray = function (data) {
    return data.length === 0;
  };

  const isEmptyObject = function (data) {
    return Object.keys(data).length === 0;
  };

  function AsyncView(props) {
    const {
      data,
      init,
      pending,
      failed,
      empty,
      succeeded,
      checkEmpty
    } = props;
    const result = data.data;
    const isEmpty = !result || isEmptyArray(result) || isEmptyObject(result) || !!checkEmpty && checkEmpty(result);
    let content = succeeded;

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