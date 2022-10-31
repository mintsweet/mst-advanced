import { observer } from 'mobx-react-lite';
import { types } from 'mobx-state-tree';
import { createQueryModel, useQuery } from 'mst-advanced';

const Store = createQueryModel({
  Model: types.model({
    name: types.maybeNull(types.string),
  }),
  onQuery: (signal: AbortSignal, params: any) => {
    console.log(signal, params);
    return new Promise<{ name: string }>((resolve) =>
      setTimeout(() => {
        resolve({ name: 'hello world!' });
      }, 1000),
    );
  },
  onResult: (t, res: { name: string }) => {
    t.name = res.name;
  },
});

export const QueryPage = observer(() => {
  const { loading, error, name } = useQuery(Store);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something Error.</div>;
  }

  return <div>query-page's name: {name}</div>;
});
