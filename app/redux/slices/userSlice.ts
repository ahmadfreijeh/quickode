import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  apiToken: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setApiToken: (state, action) => {
      state.apiToken = action.payload;
    },
  },
});

export const {setUser, setApiToken} = userSlice.actions;
export default userSlice.reducer;
