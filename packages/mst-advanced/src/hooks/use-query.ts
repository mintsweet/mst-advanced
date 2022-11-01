import { useEffect, useRef } from 'react';
import { ModelProperties, IModelType } from 'mobx-state-tree';
import { isEqual } from 'lodash';

import { useMst } from './use-mst';

export const useQuery = <PROPS extends ModelProperties, OTHERS, CustomC, CustomS>(
  Model: IModelType<PROPS, OTHERS, CustomC, CustomS>,
  params?: unknown,
) => {
  const ref = useRef<{
    params?: unknown;
    abortController?: AbortController;
  }>({
    params: {},
  });

  const store = useMst(Model);
  const { fetchData } = store;

  useEffect(() => {
    return () => {
      ref.current.abortController?.abort();
    };
  }, []);

  useEffect(() => {
    if (!isEqual(params, ref.current.params)) {
      ref.current.params = params;
      ref.current.abortController?.abort();
      ref.current.abortController = new AbortController();
      fetchData(ref.current.params, ref.current.abortController.signal);
    }
  }, [params]);

  return store;
};
