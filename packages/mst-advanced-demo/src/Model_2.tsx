import { observer } from 'mobx-react-lite';
import { useQuery } from 'mst-advanced';

import { Model2Store } from './models';

const Model2 = observer(() => {
  const { loading, error, data, errMsg } = useQuery(Model2Store);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{errMsg}</div>;
  }

  return <div>{data?.name}</div>;
});

export default Model2;
