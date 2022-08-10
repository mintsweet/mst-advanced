import { observer } from 'mobx-react-lite';
import { types } from 'mobx-state-tree';
import { createListModel, useQuery } from 'mst-advanced';

const Store = createListModel({
  Item: types.model({
    id: types.number,
    name: types.string,
  }),
  onQuery: (signal: AbortSignal, params: any) =>
    new Promise<{ total: number; data: Array<{ id: number; name: string }> }>((resolve) =>
      setTimeout(() => {
        resolve({
          total: 2,
          data: [
            {
              id: 1,
              name: 'data-1',
            },
            {
              id: 2,
              name: 'data-2',
            },
          ],
        });
      }, 1000),
    ),
  onResult: (item) => ({
    id: item.id,
    name: item.name,
  }),
});

export const ListPage = observer(() => {
  const { loading, error, items } = useQuery(Store);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something Error.</div>;
  }

  return (
    <ul>
      {items.map((it) => (
        <li key={it.id}>
          <span>ID: {it.id}</span>
          <span> | </span>
          <span>Name: {it.name}</span>
        </li>
      ))}
    </ul>
  );
});
