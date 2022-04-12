import { types, ModelProperties, IModelType, Instance } from 'mobx-state-tree';

export enum RequestStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const defineRequestStore = <
  PROPS extends ModelProperties,
  OTHERS,
  CustomC,
  CustomS,
  Response,
>({
  model,
  fetchData,
  onParams,
  onSuccess,
}: {
  model: IModelType<PROPS, OTHERS, CustomC, CustomS>;
  fetchData: ({ signal, params }: { signal: AbortSignal; params: unknown }) => Promise<Response>;
  onParams?: (t: Instance<IModelType<PROPS, OTHERS, CustomC, CustomS>>) => unknown;
  onSuccess?: (t: Instance<IModelType<PROPS, OTHERS, CustomC, CustomS>>, res: Response) => void;
}) => {
  return model
    .props({
      errMsg: types.maybe(types.frozen()),
      status: types.optional(types.enumeration(Object.values(RequestStatus)), RequestStatus.IDLE),
    })
    .volatile((t) => ({
      abortController: new AbortController(),
    }))
    .views((t) => ({
      get ready() {
        return t.status === RequestStatus.IDLE;
      },
      get loading() {
        return t.status === RequestStatus.PENDING;
      },
      get error() {
        return t.status === RequestStatus.ERROR;
      },
    }))
    .actions((t) => ({
      onSuccess: (res: Response) => {
        // Manual data processing
        if (onSuccess) {
          onSuccess(t, res);
        }

        t.status = RequestStatus.SUCCESS;
      },
      onError: (err: any) => {
        t.errMsg = err;
        t.status = RequestStatus.ERROR;
      },
    }))
    .actions((t) => ({
      fetchData: async () => {
        t.status = RequestStatus.PENDING;
        let params;

        // Request method extra parameters
        if (onParams) {
          params = onParams(t);
        }

        try {
          const res = await fetchData({ signal: t.abortController.signal, params });
          t.onSuccess(res);
        } catch (err) {
          t.onError(err);
        }
      },
    }))
    .actions((t) => ({
      afterCreate() {
        void t.fetchData();
      },
      beforeDestroy() {
        t.abortController.abort();
      },
    }));
};
