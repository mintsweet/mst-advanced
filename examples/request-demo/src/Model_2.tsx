import { observer } from 'mobx-react-lite';
import { useMst } from 'mst-advanced';

import { Model2Store } from './models';

const Model2 = observer(() => {
  const { loading, error, data, errMsg } = useMst(Model2Store);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{errMsg}</div>;
  }

  return <div>{data?.name}</div>;
});

export default () => {
  return (
    <div>
      <h2>Model 2</h2>
      <Model2 />
    </div>
  );
};
