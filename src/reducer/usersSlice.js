import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      const { id, name, email } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
      }
    },
    userFilter(state, action) {
      state.entities = state.entities.filter((user) =>
        user.name.includes(action.payload.searchName) && user.email.includes(action.payload.searchEmail)
      );
    },
    userDeleted(state, action) {
      const { id } = action.payload;
      const existingUser = state.entities.find((user) => user.id === id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.id !== id);
      }
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userFilter, userUpdated, userDeleted } = usersSlice.actions;

export default usersSlice.reducer;
