import { useEffect, useRef } from 'react';
import { ModelProperties, IModelType } from 'mobx-state-tree';
import { isEqual } from 'lodash';

import { useMst } from './use-mst';

type IParams = Record<string, unknown>;

export const useQuery = <PROPS extends ModelProperties, OTHERS, CustomC, CustomS>(
  Model: IModelType<PROPS, OTHERS, CustomC, CustomS>,
  params?: IParams,
) => {
  const prevParams = useRef<IParams>();
  const store = useMst(Model);
  const { fetchData } = store;

  useEffect(() => {
    if (!isEqual(params, prevParams.current)) {
      fetchData(params);
      prevParams.current = params;
    }
  }, [params, prevParams, fetchData]);

  return store;
};
