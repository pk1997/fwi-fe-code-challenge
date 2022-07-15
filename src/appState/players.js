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

export const PLAYERS_INITIAL_STATE = adapter.getInitialState();

const { actions, reducer } = createSlice({
  name: 'players',
  initialState: PLAYERS_INITIAL_STATE,
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllPlayers.fulfilled, (state, action) => {
        adapter.setAll(state, action.payload.items);
      })
      .addCase(addPlayer.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload);
      }),
});

export const {
  // any actions
} = actions;

export default reducer;
