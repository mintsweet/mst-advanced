/// <reference types="react" />
import { Instance, IAnyModelType } from 'mobx-state-tree';
declare type UseMstConfigFactory<M extends IAnyModelType> = () => Parameters<M['create']>;
export declare const useMst: <M extends IAnyModelType>(Model: M, configFactory?: UseMstConfigFactory<M> | undefined, deps?: import("react").DependencyList) => Instance<M>;
export {};
