import { types, ModelProperties, IModelType, cast } from 'mobx-state-tree';

import { createQueryModel } from './create-query-model';

export const createListModel = <PROPS extends ModelProperties, OTHERS, CustomC, CustomS>({
  Item,
  onQuery,
  onResult,
}: {
  Item: IModelType<PROPS, OTHERS, CustomC, CustomS>;
  onQuery: (params: unknown, signal: AbortSignal) => Promise<{ total: number; data: any[] }>;
  onResult?: (item: any) => void;
}) => {
  return createQueryModel({
    Model: types.model({
      total: types.optional(types.number, 0),
      items: types.optional(types.array(Item), []),
    }),
    onQuery,
    onResult: (t, res) => {
      t.total = res.total;
      t.items = cast(res.data.map((i) => onResult?.(i) ?? i));
    },
  });
};
