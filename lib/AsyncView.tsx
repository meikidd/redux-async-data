import * as React from 'react';
import { AsyncData, isInit, isPending, isSucceeded, isFailed } from './index';

export interface AsyncViewProps {
  data: AsyncData<any>;
  init?: React.ReactNode;
  pending?: React.ReactNode;
  failed?: React.ReactNode;
  empty?: React.ReactNode;
  succeeded: React.ReactNode;
}

export function AsyncView(props: AsyncViewProps) {
  const { data, init, pending, failed, empty, succeeded } = props;
  const result = data.data;
  const isEmpty = !result || !result.length || !Object.keys(result).length;

  let content = succeeded;
  if (isInit(data) && !!init) {
    content = init;
  } else if (isPending(data) && !!pending) {
    content = pending;
  } else if (isFailed(data) && !!failed) {
    content = failed;
  } else if (isSucceeded(data) && isEmpty && !!empty) {
    content = empty;
  }
  return <React.Fragment>{content}</React.Fragment>;
}
