import { ModelProperties, IModelType } from 'mobx-state-tree';
export declare const createListModel: <PROPS extends ModelProperties, OTHERS, CustomC, CustomS>({ Item, onQuery, onResult, feildName, }: {
    Item: IModelType<PROPS, OTHERS, CustomC, CustomS>;
    onQuery: (signal: AbortSignal, params?: unknown) => Promise<any>;
    onResult?: ((item: any) => void) | undefined;
    feildName?: string | undefined;
}) => IModelType<{
    total: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<number>, [undefined]>;
    items: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<IModelType<PROPS, OTHERS, CustomC, CustomS>>, [undefined]>;
} & {
    errMsg: import("mobx-state-tree").IMaybeNull<import("mobx-state-tree").IType<any, any, any>>;
    status: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").ISimpleType<import("./create-query-model").RequestStatus>, [undefined]>;
}, {
    abortController: AbortController;
} & {
    readonly loading: boolean;
    readonly error: boolean;
} & {
    fetchData: (params?: any, signal?: AbortSignal | undefined) => Promise<void>;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
