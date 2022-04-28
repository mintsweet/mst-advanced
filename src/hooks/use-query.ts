import { useEffect } from 'react';
import { ModelProperties, IModelType } from 'mobx-state-tree';

import { useMst } from './use-mst';

export const useQuery = <PROPS extends ModelProperties, OTHERS, CustomC, CustomS>(
  Model: IModelType<PROPS, OTHERS, CustomC, CustomS>,
  params?: Record<string, unknown>,
) => {
  const store = useMst(Model);

  useEffect(() => {
    store.fetchData(params);
  }, [JSON.stringify(params)]);

  return store;
};
