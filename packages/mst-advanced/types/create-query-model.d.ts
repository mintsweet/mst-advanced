import { ModelProperties, IModelType, Instance } from 'mobx-state-tree';
export declare enum RequestStatus {
    PENDING = "pending",
    SUCCESS = "success",
    ERROR = "error"
}
export declare const createQueryModel: <PROPS extends ModelProperties, OTHERS, CustomC, CustomS, Response_1>({ Model, onQuery, onResult, }: {
    Model: IModelType<PROPS, OTHERS, CustomC, CustomS>;
    onQuery: (signal: AbortSignal, params?: unknown) => Promise<Response_1>;
    onResult: (t: import("mobx-state-tree/dist/internal").STNValue<import("mobx-state-tree").ModelInstanceType<PROPS, OTHERS>, IModelType<PROPS, OTHERS, CustomC, CustomS>>, res: Response_1) => void;
}) => IModelType<PROPS & {
    errMsg: import("mobx-state-tree").IMaybeNull<import("mobx-state-tree").IType<any, any, any>>;
    status: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<RequestStatus>, [undefined]>;
}, OTHERS & {
    abortController: AbortController;
} & {
    readonly loading: boolean;
    readonly error: boolean;
} & {
    fetchData: (params?: any, signal?: AbortSignal | undefined) => Promise<void>;
}, CustomC, CustomS>;
