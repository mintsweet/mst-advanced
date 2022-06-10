import { types, ModelProperties, IModelType, Instance } from 'mobx-state-tree';

export enum RequestStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const createRequestModel = <
  PROPS extends ModelProperties,
  OTHERS,
  CustomC,
  CustomS,
  Response,
>({
  Model,
  fetchData,
  onSuccess,
}: {
  Model: IModelType<PROPS, OTHERS, CustomC, CustomS>;
  fetchData: (params: unknown, signal: AbortSignal) => Promise<Response>;
  onSuccess?: (t: Instance<typeof Model>, res: Response) => void;
}) => {
  return Model.props({
    errMsg: types.maybeNull(types.frozen()),
    status: types.optional(types.enumeration(Object.values(RequestStatus)), RequestStatus.PENDING),
  })
    .volatile(() => ({
      abortController: new AbortController(),
    }))
    .views((t) => ({
      get loading() {
        return t.status === RequestStatus.PENDING;
      },
      get error() {
        return t.status === RequestStatus.ERROR;
      },
    }))
    .actions((t) => ({
      onSuccess: (res: Response) => {
        onSuccess?.(t, res);
        t.status = RequestStatus.SUCCESS;
      },
      onError: (err: any) => {
        t.errMsg = err;
        t.status = RequestStatus.ERROR;
      },
    }))
    .actions((t) => ({
      fetchData: async (params: unknown) => {
        t.status = RequestStatus.PENDING;
        try {
          const res = await fetchData(params, t.abortController.signal);
          t.onSuccess(res);
        } catch (err) {
          t.onError(err);
        }
      },
    }))
    .actions((t) => ({
      beforeDestroy() {
        t.abortController.abort();
      },
    }));
};
