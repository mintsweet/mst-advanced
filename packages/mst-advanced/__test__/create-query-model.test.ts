import { when } from 'mobx';
import { types, destroy } from 'mobx-state-tree';

import { createQueryModel, RequestStatus } from '../src';

const onQuery = jest.fn().mockResolvedValue({
  name: 'Test',
});

const Model = createQueryModel({
  Model: types.model({
    name: types.optional(types.string, ''),
  }),
  onQuery,
  onResult: (t, res: any) => {
    t.name = res.name;
  },
});

describe('create-query-model', () => {
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

    it('should be the inital name when the model is created', () => {
      expect(model.name).toBe('');
    });
  });

  describe('fetchData', () => {
    it('should update `data` && `status` after fetch success', async () => {
      model.fetchData();
      await when(() => model.status === RequestStatus.SUCCESS);
      expect(model.name).toEqual('Test');
    });

    it('should update `status` after fetch error', async () => {
      onQuery.mockRejectedValue('Fetch Error');
      model.fetchData();
      await when(() => model.status === RequestStatus.ERROR);
      expect(model.errMsg).toBe('Fetch Error');
    });
  });
});
