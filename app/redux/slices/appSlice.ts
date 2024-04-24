import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loaded: false,
  error: {
    has_error: false,
    error_title: 'Error',
    error_description:
      'Oops! Something went wrong. Please try again later or contact support.',
  },
  forceUpdate: {
    // This is a sample force update object, get the real data from the server
    has_update: false,
    new_version: '1.0.0',
    update_title: 'New Update Available',
    update_description: 'Please update the app to the latest version.',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setForceUpdate: (state, action) => {
      state.forceUpdate = action.payload;
    },
    setAppError: (state, action) => {
      state.error.has_error = !action.payload.has_error
        ? false
        : action.payload.has_error;

      state.error.error_title = !action.payload.error_title
        ? initialState.error.error_title
        : action.payload.error_title;

      state.error.error_description = !action.payload.error_description
        ? initialState.error.error_description
        : action.payload.error_description;
    },
  },
});

export const {setLoaded, setForceUpdate, setAppError} = appSlice.actions;
export default appSlice.reducer;
