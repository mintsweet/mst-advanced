import { types, flow, toGenerator, ModelProperties, IModelType, Instance } from 'mobx-state-tree';

export enum RequestStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const createQueryModel = <
  PROPS extends ModelProperties,
  OTHERS,
  CustomC,
  CustomS,
  Response,
>({
  Model,
  onQuery,
  onResult,
}: {
  Model: IModelType<PROPS, OTHERS, CustomC, CustomS>;
  onQuery: (signal: AbortSignal, params?: unknown) => Promise<Response>;
  onResult: (t: Instance<typeof Model>, res: Response) => void;
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
      fetchData: flow(function* (params?, signal?: AbortSignal) {
        t.status = RequestStatus.PENDING;
        try {
          const res = yield* toGenerator(onQuery(signal ?? t.abortController.signal, params));
          onResult(t, res);
          t.status = RequestStatus.SUCCESS;
        } catch (err) {
          t.errMsg = err;
          t.status = RequestStatus.ERROR;
        }
      }),
    }));
};
