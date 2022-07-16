import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
const adapter = createEntityAdapter();

export const {
  selectById: getPlayerById,
  selectAll: getPlayers,
  selectEntities: getPlayerEntities,
  selectIds: getPlayerIds,
  selectTotal: getTotalPlayers,
} = adapter.getSelectors((state) => state.players);

const headers = new Headers({
  'Content-Type': 'application/json',
});

export const fetchAllPlayers = createAsyncThunk(
  'players/fetchAll',
  async () => {
    const response = await fetch('/api/players', { headers });
    const json = await response.json();

    return json;
  }
);
export const addPlayer = createAsyncThunk(
  '/players/add',
  async (initialPlayer) => {
    const response = await fetch('/api/players', {
      method: 'POST',
      headers,
      body: JSON.stringify(initialPlayer),
    });
    const json = response.json();
    return json;
  }
);

export const editPlayer = createAsyncThunk('/players/edit', async (data) => {
  let id = data.id;
  delete data['id'];
  const response = await fetch(`/api/players/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data),
  });
  const json = response.json();
  return json;
});

export const deletePlayer = createAsyncThunk(
  '/players/delete',
  async (playerId) => {
    await fetch(`/api/players/${playerId}`, {
      method: 'DELETE',
    });

    return { id: playerId };
  }
);

export const PLAYERS_INITIAL_STATE = adapter.getInitialState();

const { actions, reducer } = createSlice({
  name: 'players',
  initialState: PLAYERS_INITIAL_STATE,
  reducers: {
    sortProductMetrics(state, action) {
      const { attribute, order } = action.payload;
      let entities = JSON.parse(JSON.stringify(state.entities));
      let keys = Object.keys(entities);
      // var array = ['White 023', 'White', 'White flower', 'Teatr'];
      keys.sort(function (x, y) {
        if (entities[x][attribute] < entities[y][attribute]) {
          return order === 'asc' ? -1 : 1;
        }
        if (entities[x][attribute] > entities[y][attribute]) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      });
      let data = [];
      keys.forEach((key) => {
        data.push(entities[key]);
      });
      adapter.setAll(state, data);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllPlayers.fulfilled, (state, action) => {
        adapter.setAll(state, action.payload.items);
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload);
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload.id);
      })
      .addCase(editPlayer.fulfilled, (state, action) => {
        adapter.updateOne(state, {
          id: action.payload.id,
          changes: { ...action.payload },
        });
      }),
});

export const {
  // any actions
} = actions;
export const { sortProductMetrics } = actions;
export default reducer;
