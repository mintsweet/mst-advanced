import { types, flow, toGenerator, ModelProperties, IModelType, Instance } from 'mobx-state-tree';

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
  return types
    .compose(
      model,
      types.model({
        status: types.optional(types.enumeration(Object.values(RequestStatus)), RequestStatus.IDLE),
      }),
    )
    .volatile(() => ({
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
      fetchData: flow(function* () {
        t.status = RequestStatus.PENDING;
        try {
          let params;

          // Request method extra parameters
          if (onParams) {
            params = onParams(t);
          }

          const res = yield* toGenerator(fetchData({ signal: t.abortController.signal, params }));

          // Manual data processing
          if (onSuccess) {
            onSuccess(t, res);
          }

          t.status = RequestStatus.SUCCESS;
        } catch (err) {
          t.status = RequestStatus.ERROR;
        }
      }),
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
