import { useEffect, useRef } from 'react';
import { ModelProperties, IModelType } from 'mobx-state-tree';
import { isEqual } from 'lodash';

import { useMst } from './use-mst';

export const useQuery = <PROPS extends ModelProperties, OTHERS, CustomC, CustomS>(
  Model: IModelType<PROPS, OTHERS, CustomC, CustomS>,
  params?: unknown,
) => {
  const prevParams = useRef<unknown>();
  const store = useMst(Model);
  const { fetchData } = store;

  useEffect(() => {
    if (!params) {
      fetchData();
    } else if (!isEqual(params, prevParams.current)) {
      fetchData(params);
      prevParams.current = params;
    }
  }, [params, prevParams, fetchData]);

  return store;
};
