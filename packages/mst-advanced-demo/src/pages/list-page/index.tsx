import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { types } from 'mobx-state-tree';
import { createListModel, useQuery } from 'mst-advanced';

const Store = createListModel({
  Item: types.model({
    id: types.number,
    name: types.string,
  }),
  onQuery: (signal: AbortSignal, params: any) => {
    console.log(signal, params);
    signal.addEventListener('abort', () => console.log(1));
    return new Promise<{ total: number; data: Array<{ id: number; name: string }> }>((resolve) =>
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
      }, 3000),
    );
  },
  onResult: (item) => ({
    id: item.id,
    name: item.name,
  }),
});

export const ListPage = observer(() => {
  const [page, setPage] = useState(1);

  const { loading, error, items } = useQuery(Store, {
    page,
  });

  return (
    <div>
      <div onClick={() => setPage(page + 1)}>change params</div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Something Error.</div>
      ) : (
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <span>ID: {it.id}</span>
              <span> | </span>
              <span>Name: {it.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
