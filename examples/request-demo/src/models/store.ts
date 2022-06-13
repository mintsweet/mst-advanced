import { types } from 'mobx-state-tree';
import { createQueryModel } from 'mst-advanced';

import { getMockData, getMockError, Response } from './api';

const CommonModel = types.model({
  params: types.maybeNull(
    types.model({
      page: types.number,
      pageSize: types.number,
    }),
  ),
  data: types.maybeNull(
    types.model({
      name: types.string,
    }),
  ),
});

export const Model1Store = createQueryModel({
  Model: CommonModel,
  onQuery: getMockData,
  onResult: (t, res: Response) => {
    t.data = res;
  },
});

export const Model2Store = createQueryModel({
  Model: CommonModel,
  onQuery: getMockError,
  onResult: (t, res: Response) => {
    t.data = res;
  },
});
