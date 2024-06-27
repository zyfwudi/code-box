import { JssStyle } from 'jss';

export type JsStyles<Name extends string = string> = Record<Name, JssStyle<undefined> | string>;

export type IReturnVoid<T = undefined> = (...args: T[]) => void;
