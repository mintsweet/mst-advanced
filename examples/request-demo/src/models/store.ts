import { types } from 'mobx-state-tree';
import { defineRequestStore } from 'mst-advanced';

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

export const Model1Store = defineRequestStore({
  model: CommonModel,
  fetchData: getMockData,
  onParams: (t) => t.params,
  onSuccess: (t, res: Response) => {
    t.data = res;
  },
});

export const Model2Store = defineRequestStore({
  model: CommonModel,
  fetchData: getMockError,
  onParams: (t) => t.params,
  onSuccess: (t, res: Response) => {
    t.data = res;
  },
});
