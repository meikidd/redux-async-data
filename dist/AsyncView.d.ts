import * as React from 'react';
import { AsyncData } from './index';
export interface AsyncViewProps {
    data: AsyncData<any>;
    init?: React.ReactNode;
    pending?: React.ReactNode;
    failed?: React.ReactNode;
    empty?: React.ReactNode;
    succeeded: React.ReactNode;
    checkEmpty?: Function;
}
export declare function AsyncView(props: AsyncViewProps): JSX.Element;
