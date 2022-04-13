import { useEffect, useMemo } from 'react';
import { destroy, Instance, IAnyModelType } from 'mobx-state-tree';

type UseMstConfigFactory<M extends IAnyModelType> = () => Parameters<M['create']>;

export const useMst = <M extends IAnyModelType>(
  Model: M,
  configFactory?: UseMstConfigFactory<M>,
  deps: React.DependencyList = [],
): Instance<M> => {
  const model = useMemo(() => {
    return Model.create(...(configFactory?.() ?? []));
  }, [Model, ...deps]);

  useEffect(() => () => destroy(model), [model]);

  return model;
};
