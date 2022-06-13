import { observer } from 'mobx-react-lite';
import { useQuery } from 'mst-advanced';

import { Model1Store } from './models';

const Model1 = observer(() => {
  const { loading, error, data } = useQuery(Model1Store, { paeg: 1 });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something Error.</div>;
  }

  return <div>{data?.name}</div>;
});

export default Model1;
