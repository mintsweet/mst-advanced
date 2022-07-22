import { types, ModelProperties, IModelType, cast } from 'mobx-state-tree';

import { createQueryModel } from './create-query-model';

export const createListModel = <PROPS extends ModelProperties, OTHERS, CustomC, CustomS>({
  Item,
  onQuery,
  onResult,
  feildName = 'data',
}: {
  Item: IModelType<PROPS, OTHERS, CustomC, CustomS>;
  onQuery: (
    signal: AbortSignal,
    params?: unknown,
  ) => Promise<{ total: number } & { [key: string]: any[] }>;
  onResult?: (item: any) => void;
  feildName?: string;
}) => {
  return createQueryModel({
    Model: types.model({
      total: types.optional(types.number, 0),
      items: types.optional(types.array(Item), []),
    }),
    onQuery,
    onResult: (t, res) => {
      t.total = res.total;
      t.items = cast(res[`${feildName}`].map((i) => onResult?.(i) ?? i));
    },
  });
};
