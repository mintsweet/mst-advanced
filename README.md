# mst-advanced

> advanced model for mst

## Installation

```
$ yarn add react react-dom mobx mobx-state-tree lodash
$ yarn add mst-advanced
```

## Usage

### Create Query Model

```javascript
import { types } from 'mobx-state-tree';
import { createQueryModel } from 'mst-advanced';

export const Store = createQueryModel({
  Model: types.model({
    name: types.maybeNull(types.string);
  }),
  onQuery: (signal) => apiCall('/xxx/xxx', { signal }),
  onResult: (t, res) => {
    t.data = res;
  },
});
```

### Create List Model

```javascript
import { types } from 'mobx-state-tree';
import { createListModel } from 'mst-advanced';

const Item = types.model({
  name: types.string;
});

export const Store = createListModel({
  Item,
  onQuery: (signal, params) => apiCall('/xxx/xxx', { signal, params }),
  onResult: (i:) => ({
    name: i.name,
  }),
});
```

### Use in react page

```javascript
import { observer } from 'mobx-react-lite';
import { useQuery } from 'mst-advanced';

import { Store } from '../models'; // query model or list model

export default function Page() {
  const { loading, error, data } = useQuery(Model1Store, { page: 1, pageSize: 10 });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something Error.</div>;
  }

  return <div>page</div>;
}
```

## License

MIT
