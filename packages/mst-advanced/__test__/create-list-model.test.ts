import { when } from 'mobx';
import { types, destroy } from 'mobx-state-tree';

import { createListModel, RequestStatus } from '../src';

const onQuery = jest.fn().mockResolvedValue({
  total: 1,
  data: [
    {
      name: 'Test',
    },
  ],
});

const Model = createListModel({
  Item: types.model({
    name: types.string,
  }),
  onQuery,
});

describe('create-list-model', () => {
  let model: any;

  beforeEach(() => {
    model = Model.create();
  });

  afterEach(() => {
    destroy(model);
  });

  describe('model create', () => {
    it('should be the initial status when the model is created', () => {
      expect(model.status).toBe(RequestStatus.PENDING);
    });

    it('should be the inital total when the model is created', () => {
      expect(model.total).toBe(0);
    });

    it('should be the inital items when the model is created', () => {
      expect(model.items).toEqual([]);
    });
  });

  describe('fetchData', () => {
    it('should update `data` && `status` after fetch success', async () => {
      model.fetchData();
      await when(() => model.total === 1);
      expect(model.items).toEqual([{ name: 'Test' }]);
    });
  });
});
