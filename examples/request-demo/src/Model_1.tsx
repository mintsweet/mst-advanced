import { observer } from 'mobx-react-lite';
import { useMst } from 'mst-advanced';

import { Model1Store } from './models';

const Model1 = observer(() => {
  const { loading, error, data } = useMst(Model1Store);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something Error.</div>;
  }

  return <div>{data?.name}</div>;
});

export default () => {
  return (
    <div>
      <h2>Model 1</h2>
      <Model1 />
    </div>
  );
};
